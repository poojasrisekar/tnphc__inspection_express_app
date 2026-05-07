import prisma from "../../shared/prisma";

// 🔹 GET FULL VIEW
export const getSuperStructureFullViewService =
  async (projectId: string) => {

    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId
        },

        include: {
          SuperStructure: true,

          SuperStructureProgress: {
            where: {
              isActive: true
            }
          },

          superStructureQuality: {
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
          project.SuperStructureProgress.filter(
            (p) =>
              p.blockName === block.blockName
          );

        return {
          blockName: block.blockName,

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
      projectId: project.id,

      projectName:
        project.projectName,

      locationName:
        project.locationName,

      totalBlocks:
        blocks.length,

      blocks,

      quality:
        project.superStructureQuality || null
    };
  };

// 🔹 UPSERT PROGRESS
export const upsertProgressDB =
  async (data: any) => {

    const existing =
      await prisma.superStructureProgress.findFirst({
        where: {
          projectId: data.projectId,

          blockName: data.blockName,

          floorName: data.floorName,

          isActive: true
        }
      });

    if (existing) {

      return prisma.superStructureProgress.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.superStructureProgress.create({
      data
    });
  };

// 🔹 DELETE (SOFT DELETE)
export const deleteProgressDB =
  (id: string) => {

    return prisma.superStructureProgress.update({
      where: {
        id
      },

      data: {
        isActive: false
      }
    });
  };

// 🔹 UPSERT QUALITY
export const upsertQualityDB =
  async (data: any) => {

    const existing =
      await prisma.superStructureQuality.findFirst({
        where: {
          projectId: data.projectId,

          isActive: true
        }
      });

    if (existing) {

      return prisma.superStructureQuality.update({
        where: {
          id: existing.id
        },

        data
      });
    }

    return prisma.superStructureQuality.create({
      data
    });
  };

// 🔹 GET PROGRESS
export const getProgressByProjectService =
  async (projectId: string) => {

    return prisma.superStructureProgress.findMany({
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
export const getQualityByProjectService =
  async (projectId: string) => {

    return prisma.superStructureQuality.findFirst({
      where: {
        projectId,

        isActive: true
      }
    });
  };