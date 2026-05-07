import prisma from "../../shared/prisma";

// 🔹 FULL VIEW
export const getExteriorsFullViewService =
  async (projectId: string) => {

    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId
        },

        include: {

          SuperStructure: true,

          exteriorsProgress: {
            where: {
              isActive: true
            }
          },

          exteriorsQuality: {
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
          project.exteriorsProgress.filter(
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
        project.exteriorsQuality || null
    };
  };

// 🔹 UPSERT PROGRESS
export const upsertExteriorsProgressDB =
  async (data: any) => {

    const existing =
      await prisma.exteriorsProgress.findFirst({
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

      return prisma.exteriorsProgress.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.exteriorsProgress.create({
      data
    });
  };

// 🔹 UPSERT QUALITY
export const upsertExteriorsQualityDB =
  async (data: any) => {

    const existing =
      await prisma.exteriorsQuality.findFirst({
        where: {

          projectId:
            data.projectId,

          isActive: true
        }
      });

    if (existing) {

      return prisma.exteriorsQuality.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.exteriorsQuality.create({
      data
    });
  };

// 🔹 GET PROGRESS
export const getExteriorsProgressByProjectService =
  async (projectId: string) => {

    return prisma.exteriorsProgress.findMany({
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
export const getExteriorsQualityByProjectService =
  async (projectId: string) => {

    return prisma.exteriorsQuality.findFirst({
      where: {

        projectId,

        isActive: true
      }
    });
  };

// 🔹 DELETE (SOFT DELETE)
export const deleteExteriorsProgressDB =
  (id: string) => {

    return prisma.exteriorsProgress.update({
      where: {
        id
      },

      data: {
        isActive: false
      }
    });
  };