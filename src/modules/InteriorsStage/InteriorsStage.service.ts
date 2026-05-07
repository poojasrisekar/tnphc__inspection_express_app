import prisma from "../../shared/prisma";

// 🔹 FULL VIEW
export const getInteriorsFullViewService =
  async (projectId: string) => {

    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId
        },

        include: {

          SuperStructure: true,

          interiorsProgress: {
            where: {
              isActive: true
            }
          },

          interiorsQuality: {
            where: {
              isActive: true
            }
          }
        }
      });

    if (!project)
      throw new Error("Project not found");

    const blocks =
      project.SuperStructure.map((block) => {

        const progressList =
          project.interiorsProgress.filter(
            (p) =>
              p.block === block.blockName
          );

        return {

          blockName:
            block.blockName,

          totalFloors:
            block.totalFloors,

          floors:
            block.floors ?? [],

          currentFloor:
            progressList.length,

          status:
            progressList.length === 0
              ? "NOT_STARTED"
              : progressList.length ===
                block.totalFloors
              ? "COMPLETED"
              : "IN_PROGRESS",

          isStarted:
            progressList.length > 0
        };
      });

    return {

      projectId:
        project.id,

      projectName:
        project.projectName,

      locationName:
        project.locationName,

      totalBlocks:
        blocks.length,

      blocks,

      quality:
        project.interiorsQuality || null
    };
  };

// 🔹 UPSERT PROGRESS
export const upsertInteriorsProgressDB =
  async (data: any) => {

    const existing =
      await prisma.interiorsProgress.findFirst({
        where: {

          projectId:
            data.projectId,

          block:
            data.block,

          floor:
            data.floor,

          stageOfWork:
            data.stageOfWork,

          isActive: true
        }
      });

    if (existing) {

      return prisma.interiorsProgress.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.interiorsProgress.create({
      data
    });
  };

// 🔹 UPSERT QUALITY
export const upsertInteriorsQualityDB =
  async (data: any) => {

    const existing =
      await prisma.interiorsQuality.findFirst({
        where: {

          projectId:
            data.projectId,

          isActive: true
        }
      });

    if (existing) {

      return prisma.interiorsQuality.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.interiorsQuality.create({
      data
    });
  };

// 🔹 GET PROGRESS
export const getInteriorsProgressByProjectService =
  async (projectId: string) => {

    return prisma.interiorsProgress.findMany({
      where: {

        projectId,

        isActive: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

// 🔹 GET QUALITY
export const getInteriorsQualityByProjectService =
  async (projectId: string) => {

    return prisma.interiorsQuality.findFirst({
      where: {

        projectId,

        isActive: true
      }
    });
  };

// 🔹 DELETE (SOFT DELETE)
export const deleteInteriorsProgressDB =
  (id: string) => {

    return prisma.interiorsProgress.update({
      where: {
        id
      },

      data: {
        isActive: false
      }
    });
  };