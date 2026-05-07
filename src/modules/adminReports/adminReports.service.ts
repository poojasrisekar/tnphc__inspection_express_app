import prisma from "../../shared/prisma";

export const getAdminDashboardReportService =
  async () => {

    const projects =
      await prisma.project.findMany({

        where: {
          isActive: true
        },

        include: {

          district: true,

          officer: true,

          // 🔹 LAND
          landSiteInspection: {
            where: {
              isActive: true
            }
          },

          // 🔹 PRE CONSTRUCTION
          preConstructionInspections: {
            where: {
              isActive: true
            }
          },

          // 🔹 FOUNDATION
          foundationProgresses: {
            where: {
              isActive: true
            }
          },

          foundationQualityChecks: {
            where: {
              isActive: true
            }
          },

          // 🔹 PLINTH
          plinthStages: {
            where: {
              isActive: true
            }
          },

          // 🔹 SUPER STRUCTURE
          SuperStructure: {
            where: {
              isActive: true
            }
          },

          SuperStructureProgress: {
            where: {
              isActive: true
            }
          },

          superStructureQuality: true,

          // 🔹 INTERIORS
          interiorsProgress: {
            where: {
              isActive: true
            }
          },

          interiorsQuality: true,

          // 🔹 EXTERIORS
          exteriorsProgress: {
            where: {
              isActive: true
            }
          },

          exteriorsQuality: true,

          // 🔹 DEVELOPMENT
          DevelopmentWork: {
            where: {
              isActive: true
            }
          },

          // 🔹 TAKEOVER
          TakeoverBuildingInsepction: {
            where: {
              isActive: true
            }
          },

          TakeoverDevelopmentWork: {
            where: {
              isActive: true
            }
          }
        }
      });

    const formattedProjects =
      projects.map((project) => {

        // 🔹 CURRENT STAGE

        let currentStage = "NOT_STARTED";

        if (project.exteriorsQuality) {
          currentStage = "EXTERIORS";
        }

        else if (project.interiorsQuality) {
          currentStage = "INTERIORS";
        }

        else if (project.superStructureQuality) {
          currentStage = "SUPER_STRUCTURE";
        }

        else if (
          project.plinthStages.length > 0
        ) {
          currentStage = "PLINTH";
        }

        else if (
          project.foundationQualityChecks.length > 0 ||
          project.foundationProgresses.length > 0
        ) {
          currentStage = "FOUNDATION";
        }

        else if (
          project.preConstructionInspections.length > 0
        ) {
          currentStage = "PRE_CONSTRUCTION";
        }

        else if (
          project.landSiteInspection.length > 0
        ) {
          currentStage =
            "LAND_SITE_INSPECTION";
        }

        // 🔹 STATUS

        let status = "PENDING";

        if (
          project.exteriorsQuality
        ) {
          status = "COMPLETED";
        }

        else if (

          project.landSiteInspection.length > 0 ||

          project.preConstructionInspections.length > 0 ||

          project.foundationProgresses.length > 0 ||

          project.foundationQualityChecks.length > 0 ||

          project.plinthStages.length > 0 ||

          project.SuperStructureProgress.length > 0 ||

          project.interiorsProgress.length > 0 ||

          project.exteriorsProgress.length > 0 ||

          project.DevelopmentWork.length > 0 ||

          project.TakeoverBuildingInsepction.length > 0 ||

          project.TakeoverDevelopmentWork.length > 0

        ) {
          status = "IN_PROGRESS";
        }

        // 🔹 SUPER STRUCTURE FLOOR DETAILS

        const totalFloors =
          project.SuperStructure.reduce(
            (acc, item) =>
              acc + item.totalFloors,
            0
          );

        const completedFloors =
          project.SuperStructureProgress.length;

        // 🔹 BLOCK DETAILS

        const blocks =
          project.SuperStructure.map((block) => {

            const progressList =
              project.SuperStructureProgress.filter(
                (p) =>
                  p.blockName ===
                  block.blockName
              );

            return {

              blockName:
                block.blockName,

              totalFloors:
                block.totalFloors,

              floors:
                block.floors ?? [],

              completedFloors:
                progressList.length,

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

          district:
            project.district?.name,

          officer:
            project.officer?.name,

          location:
            project.locationName,

          currentStage,

          status,

          latestUpdatedAt:
            project.updatedAt,

          // 🔹 STAGES

          stages: {

            landCheck: {
              started:
                project.landSiteInspection.length > 0,

              completed:
                project.landSiteInspection.length > 0
            },

            preConstruction: {
              started:
                project.preConstructionInspections.length > 0,

              completed:
                project.preConstructionInspections.length > 0
            },

            foundation: {
              started:
                project.foundationProgresses.length > 0 ||
                project.foundationQualityChecks.length > 0,

              completed:
                project.foundationQualityChecks.length > 0
            },

            plinth: {
              started:
                project.plinthStages.length > 0,

              completed:
                project.plinthStages.length > 0
            },

            superStructure: {

              started:
                project.SuperStructureProgress.length > 0,

              completed:
                !!project.superStructureQuality,

              totalBlocks:
                project.SuperStructure.length,

              totalFloors,

              completedFloors,

              blocks
            },

            interiors: {

              started:
                project.interiorsProgress.length > 0,

              completed:
                !!project.interiorsQuality,

              totalBlocks:
                project.SuperStructure.length,

              blocks:
                project.SuperStructure.map((block) => {

                  const progressList =
                    project.interiorsProgress.filter(
                      (p) =>
                        p.block ===
                        block.blockName
                    );

                  return {

                    blockName:
                      block.blockName,

                    totalFloors:
                      block.totalFloors,

                    completedFloors:
                      progressList.length,

                    status:
                      progressList.length === 0
                        ? "NOT_STARTED"
                        : progressList.length ===
                          block.totalFloors
                        ? "COMPLETED"
                        : "IN_PROGRESS"
                  };
                })
            },

            exteriors: {

              started:
                project.exteriorsProgress.length > 0,

              completed:
                !!project.exteriorsQuality,

              totalBlocks:
                project.SuperStructure.length,

              blocks:
                project.SuperStructure.map((block) => {

                  const progressList =
                    project.exteriorsProgress.filter(
                      (p) =>
                        p.block ===
                        block.blockName
                    );

                  return {

                    blockName:
                      block.blockName,

                    totalFloors:
                      block.totalFloors,

                    completedFloors:
                      progressList.length,

                    status:
                      progressList.length === 0
                        ? "NOT_STARTED"
                        : progressList.length ===
                          block.totalFloors
                        ? "COMPLETED"
                        : "IN_PROGRESS"
                  };
                })
            },

            developmentWork: {

              started:
                project.DevelopmentWork.length > 0,

              completed:
                project.DevelopmentWork.length > 0
            },

            takeOver: {

              started:
                project.TakeoverBuildingInsepction.length > 0 ||
                project.TakeoverDevelopmentWork.length > 0,

              completed:
                project.TakeoverBuildingInsepction.length > 0 ||
                project.TakeoverDevelopmentWork.length > 0
            }
          }
        };
      });

    // 🔹 SUMMARY

    const totalProjects =
      formattedProjects.length;

    const completedProjects =
      formattedProjects.filter(
        (p) => p.status === "COMPLETED"
      ).length;

    const inProgressProjects =
      formattedProjects.filter(
        (p) => p.status === "IN_PROGRESS"
      ).length;

    const pendingProjects =
      formattedProjects.filter(
        (p) => p.status === "PENDING"
      ).length;

    return {

      summary: {

        totalProjects,

        completedProjects,

        inProgressProjects,

        pendingProjects
      },

      projects: formattedProjects
    };
  };