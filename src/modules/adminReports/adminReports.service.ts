import prisma from "../../shared/prisma";

import { pageConfig } from "../../utils/query.helper";

export const getAdminDashboardReportService =
  async ({
    pageNumber,
    pageSize,
    search
  }: {
    pageNumber?: string;
    pageSize?: string;
    search?: string;
  }) => {

    const {
      skip,
      take,
      pageNumber: currentPage,
      pageSize: limit
    } = pageConfig({
      pageNumber,
      pageSize
    });

    const whereCondition: any = {
      isActive: true
    };

    if (search) {
      whereCondition.projectName = {
        contains: search,
        mode: "insensitive"
      };
    }

    const [projects, totalRecords] =
      await Promise.all([

        prisma.project.findMany({

          where: whereCondition,

          include: {

            district: true,

            officer: true,

            landSiteInspection: {
              where: {
                isActive: true
              }
            },

            preConstructionInspections: {
              where: {
                isActive: true
              }
            },

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

            plinthStages: {
              where: {
                isActive: true
              }
            },

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

            interiorsProgress: {
              where: {
                isActive: true
              }
            },

            interiorsQuality: true,

            exteriorsProgress: {
              where: {
                isActive: true
              }
            },

            exteriorsQuality: true,

            DevelopmentWork: {
              where: {
                isActive: true
              }
            },

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
          },

          orderBy: {
            createdAt: "desc"
          },

          skip,
          take
        }),

        prisma.project.count({
          where: whereCondition
        })
      ]);

    const formattedProjects =
      projects.map((project) => {

        let currentStage =
          "NOT_STARTED";

        if (
          project.exteriorsQuality
        ) {
          currentStage =
            "EXTERIORS";
        }

        else if (
          project.interiorsQuality
        ) {
          currentStage =
            "INTERIORS";
        }

        else if (
          project.superStructureQuality
        ) {
          currentStage =
            "SUPER_STRUCTURE";
        }

        else if (
          project.plinthStages.length >
          0
        ) {
          currentStage =
            "PLINTH";
        }

        else if (
          project.foundationQualityChecks
            .length > 0 ||
          project.foundationProgresses
            .length > 0
        ) {
          currentStage =
            "FOUNDATION";
        }

        else if (
          project
            .preConstructionInspections
            .length > 0
        ) {
          currentStage =
            "PRE_CONSTRUCTION";
        }

        else if (
          project
            .landSiteInspection
            .length > 0
        ) {
          currentStage =
            "LAND_SITE_INSPECTION";
        }

        let status = "PENDING";

        if (
          project.exteriorsQuality
        ) {
          status = "COMPLETED";
        }

        else if (

          project.landSiteInspection
            .length > 0 ||

          project
            .preConstructionInspections
            .length > 0 ||

          project
            .foundationProgresses
            .length > 0 ||

          project
            .foundationQualityChecks
            .length > 0 ||

          project.plinthStages
            .length > 0 ||

          project
            .SuperStructureProgress
            .length > 0 ||

          project
            .interiorsProgress
            .length > 0 ||

          project
            .exteriorsProgress
            .length > 0 ||

          project.DevelopmentWork
            .length > 0 ||

          project
            .TakeoverBuildingInsepction
            .length > 0 ||

          project
            .TakeoverDevelopmentWork
            .length > 0

        ) {
          status =
            "IN_PROGRESS";
        }

        const totalFloors =
          project.SuperStructure.reduce(
            (acc, item) =>
              acc + item.totalFloors,
            0
          );

        const completedFloors =
          project
            .SuperStructureProgress
            .length;

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

          totalFloors,

          completedFloors
        };
      });

    const completedProjects =
      formattedProjects.filter(
        (p) =>
          p.status ===
          "COMPLETED"
      ).length;

    const inProgressProjects =
      formattedProjects.filter(
        (p) =>
          p.status ===
          "IN_PROGRESS"
      ).length;

    const pendingProjects =
      formattedProjects.filter(
        (p) =>
          p.status ===
          "PENDING"
      ).length;

    return {

      summary: {

        totalProjects:
          totalRecords,

        completedProjects,

        inProgressProjects,

        pendingProjects
      },

      totalRecords,

      totalPages:
        Math.ceil(
          totalRecords / limit
        ),

      currentPage,

      pageSize: limit,

      projects:
        formattedProjects
    };
  };