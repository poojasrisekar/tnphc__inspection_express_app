import { status, superStructureStatus } from "@prisma/client";
import { pageConfig } from "../../utils/query.helper";
import prisma from "../../shared/prisma";

export const createProjectService = async (data: any) => {

  
  if (data.officerId) {
    const officerExists = await prisma.officer.findUnique({
      where: { id: data.officerId }
    });
    if (!officerExists) throw new Error("Invalid officerId");
  }

  
  if (data.assignedUserId) {
    const userExists = await prisma.user.findUnique({
      where: { id: data.assignedUserId }
    });
    if (!userExists) throw new Error("Invalid assignedUserId");
  }

  
  if (!data.departmentId && !data.specialUnitId) {
    throw new Error("At least one of departmentId or specialUnitId is required");
  }

  const stageData =
    Array.isArray(data.stageId) && data.stageId.length > 0
      ? { stages: { connect: data.stageId.map((id: string) => ({ id })) } }
      : {};

  return await prisma.$transaction(async (tx) => {

    
    const project = await tx.project.create({
      data: {
        districtId: data.districtId,
        departmentId: data.departmentId || null,
        specialUnitId: data.specialUnitId || null,
        officerId: data.officerId,
        locationName: data.locationName,
        projectName: data.projectName,
        assignedUserId: data.assignedUserId,
        selectedStageIds: data.stageId,
        ...stageData,
        status: status.AssignedProjects,
        createdById: data.createdById
      }
    });

    
    if (Array.isArray(data.superStructure) && data.superStructure.length > 0) {

      const superStructureData = data.superStructure.map((b: any) => {

        
        if (!Array.isArray(b.floors) || b.floors.length === 0) {
          throw new Error(`Floors required for block ${b.blockName}`);
        }

        if (b.totalFloors !== b.floors.length) {
          throw new Error(
            `totalFloors mismatch in block ${b.blockName}`
          );
        }

        return {
          projectId: project.id,
          blockName: b.blockName,
          totalFloors: b.totalFloors,
          floors: b.floors, // ✅ store custom JSON
          createdById: data.createdById
        };
      });

      await tx.superStructure.createMany({
        data: superStructureData
      });
    }

    return project;
  });
};

export const getAllProjectsService = async (query: any) => {
  const {
    pageNumber,
    pageSize,
    search,
    status,
    districtId,
    departmentId,
    specialUnitId,

    // ✅ ADD THIS
    userId
  } = query;

  const { skip, take } = pageConfig({
    pageNumber,
    pageSize
  });

  if (departmentId && specialUnitId) {
    throw new Error("Provide either departmentId OR specialUnitId, not both");
  }

  const whereCondition: any = {
    isActive: true
  };

  if (districtId) whereCondition.districtId = districtId;

  if (search) {
    whereCondition.projectName = {
      contains: search,
      mode: "insensitive"
    };
  }

  if (status) whereCondition.status = status;

  if (departmentId) whereCondition.departmentId = departmentId;

  if (specialUnitId) whereCondition.specialUnitId = specialUnitId;

  // ✅ FILTER USER PROJECTS
  if (userId) {
    whereCondition.assignedUserId = userId;
  }

  const [data, totalRecords] = await Promise.all([
    prisma.project.findMany({
      where: whereCondition,
      include: {
        officer: true,
        stages: true,
        department: true,
        specialUnit: true,
        SuperStructure: true,
        assignedUser: true
      },
      orderBy: { createdAt: "desc" },
      skip,
      take
    }),

    prisma.project.count({
      where: whereCondition
    })
  ]);

  const formattedData = data.map((p) => ({
    id: p.id,
    projectName: p.projectName,
    locationName: p.locationName,

    officerName: p.officer?.name ?? null,

    unitName:
      p.department?.name ||
      p.specialUnit?.name ||
      null,

    stage: p.stages?.[0]?.name ?? null,

    status: p.status,

    assignedUserName:
      p.assignedUser?.userName ?? null,

    selectedStageIds: p.selectedStageIds,

    stageCount: p.stages.length,

    totalBlocks: p.SuperStructure.length,

    totalFloors: p.SuperStructure.reduce(
      (sum, b) => sum + b.totalFloors,
      0
    ),

    createdAt: p.createdAt
  }));

  return {
    totalRecords,
    data: formattedData
  };
};

// ===============================================
// getProjectsByUserService
// ===============================================

export const getProjectsByUserService = async ({
  userId,
  pageNumber,
  pageSize,
  search
}: {
  userId?: string;
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

  if (userId) {
    whereCondition.assignedUserId = userId;
  }

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
          stages: true,
          department: true,
          specialUnit: true,
          assignedUser: true,
          SuperStructure: true,

          landSiteInspection: {
            where: { isActive: true }
          },

          preConstructionInspections: {
            where: { isActive: true }
          },

          foundationProgresses: {
            where: { isActive: true }
          },

          foundationQualityChecks: {
            where: { isActive: true }
          },

          plinthStages: {
            where: { isActive: true }
          },

          interiorsProgress: {
            where: { isActive: true }
          },

          interiorsQuality: true,

          exteriorsProgress: {
            where: { isActive: true }
          },

          exteriorsQuality: true,

          BuildingInspection: {
            where: { isActive: true }
          },

          DevelopmentWork: {
            where: { isActive: true }
          },

          TakeoverBuildingInsepction: {
            where: { isActive: true }
          },

          TakeoverDevelopmentWork: {
            where: { isActive: true }
          },

          SuperStructureProgress: {
            where: { isActive: true }
          },

          superStructureQuality: true
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

  const data = projects.map((p) => {

    const totalAssignedStages =
      p.stages.length;

    const completedStageNames: string[] = [];

    if (p.landSiteInspection.length > 0) {
      completedStageNames.push(
        "Land Site Inspection"
      );
    }

    if (
      p.preConstructionInspections.length > 0
    ) {
      completedStageNames.push(
        "Pre Construction"
      );
    }

    if (
      p.foundationProgresses.length > 0 ||
      p.foundationQualityChecks.length > 0
    ) {
      completedStageNames.push(
        "Foundation"
      );
    }

    if (p.plinthStages.length > 0) {
      completedStageNames.push(
        "Plinth"
      );
    }

    if (
      p.SuperStructureProgress.length > 0 ||
      p.superStructureQuality
    ) {
      completedStageNames.push(
        "Super Structure"
      );
    }

    if (
      p.interiorsProgress.length > 0 ||
      p.interiorsQuality
    ) {
      completedStageNames.push(
        "Interiors"
      );
    }

    if (
      p.exteriorsProgress.length > 0 ||
      p.exteriorsQuality
    ) {
      completedStageNames.push(
        "Exteriors"
      );
    }

    if (p.BuildingInspection.length > 0) {
      completedStageNames.push(
        "Building Inspection"
      );
    }

    if (p.DevelopmentWork.length > 0) {
      completedStageNames.push(
        "Development Work"
      );
    }

    if (
      p.TakeoverBuildingInsepction.length > 0
    ) {
      completedStageNames.push(
        "Takeover Building Inspection"
      );
    }

    if (
      p.TakeoverDevelopmentWork.length > 0
    ) {
      completedStageNames.push(
        "Takeover Development Work"
      );
    }

    const completedStages =
      completedStageNames.length;

    const pendingStages =
      totalAssignedStages - completedStages > 0
        ? totalAssignedStages - completedStages
        : 0;

    let projectStatus =
      "AssignedProjects";

    if (
      completedStages > 0 &&
      pendingStages > 0
    ) {
      projectStatus =
        "OngoingProjects";
    }

    if (
      completedStages >=
        totalAssignedStages &&
      totalAssignedStages > 0
    ) {
      projectStatus =
        "CompletedProjects";
    }

    return {
      id: p.id,

      projectName: p.projectName,

      locationName: p.locationName,

      districtName:
        p.district?.name ?? null,

      officerName:
        p.officer?.name ?? null,

      assignedUserName:
        p.assignedUser?.userName ?? null,

      unitName:
        p.department?.name ||
        p.specialUnit?.name ||
        null,

      totalAssignedStages,

      completedStages,

      completedStageNames,

      pendingStages,

      pendingStageNames:
        p.stages
          .map((s) => s.name)
          .filter(
            (name) =>
              !completedStageNames.includes(
                name
              )
          ),

      inspectionDoneCount:
        completedStages,

      inspectionPendingCount:
        pendingStages,

      selectedStageIds:
        p.selectedStageIds,

      superStructure:
        p.SuperStructure.map((b) => ({

          blockName: b.blockName,

          totalFloors: b.totalFloors,

          floors: b.floors || [],

          completedFloors:
            p.SuperStructureProgress.filter(
              (sp) =>
                sp.blockName === b.blockName
            ).length
        })),

      status: projectStatus,

      createdAt: p.createdAt
    };
  });

  return {
    totalRecords,

    totalPages:
      Math.ceil(
        totalRecords / limit
      ),

    currentPage,

    pageSize: limit,

    data
  };
};

export const updateProjectService = async (
  id: string,
  data: any
) => {

  return prisma.$transaction(
    async (tx) => {

      // ✅ CHECK PROJECT EXISTS
      const existingProject =
        await tx.project.findUnique({
          where: { id }
        });

      if (!existingProject) {
        throw new Error(
          `Project with id "${id}" does not exist.`
        );
      }

      // ✅ VALIDATE OFFICER
      if (data.officerId) {

        const officerExists =
          await tx.officer.findUnique({
            where: {
              id: data.officerId
            }
          });

        if (!officerExists) {
          throw new Error(
            "Invalid officerId"
          );
        }
      }

      // ✅ VALIDATE USER
      if (data.assignedUserId) {

        const userExists =
          await tx.user.findUnique({
            where: {
              id: data.assignedUserId
            }
          });

        if (!userExists) {
          throw new Error(
            "Invalid assignedUserId"
          );
        }
      }

      // ✅ VALIDATE UNIT
      if (
        !data.departmentId &&
        !data.specialUnitId &&
        !existingProject.departmentId &&
        !existingProject.specialUnitId
      ) {
        throw new Error(
          "At least one of departmentId or specialUnitId is required"
        );
      }

      // ✅ STAGE UPDATE
      let stageData = {};

      if (
        Array.isArray(data.stageId)
      ) {

        stageData = {
          stages: {
            set: data.stageId.map(
              (id: string) => ({
                id
              })
            )
          }
        };
      }

      // ✅ UPDATE PROJECT
      const project =
        await tx.project.update({

          where: { id },

          data: {

            districtId:
              data.districtId,

            departmentId:
              data.departmentId,

            specialUnitId:
              data.specialUnitId,

            officerId:
              data.officerId,

            locationName:
              data.locationName,

            projectName:
              data.projectName,

            assignedUserId:
              data.assignedUserId,

            selectedStageIds:
              data.stageId,

            status:
              data.status,

            ...stageData,

            updatedById:
              data.updatedById
          }
        });

      // ✅ SUPER STRUCTURE UPDATE
      if (
        Array.isArray(
          data.superStructure
        )
      ) {

        // DELETE OLD BLOCKS
        await tx.superStructure.deleteMany({
          where: {
            projectId: id
          }
        });

        // VALIDATE + CREATE NEW
        const superStructureData =
          data.superStructure.map(
            (b: any) => {

              if (
                !Array.isArray(
                  b.floors
                ) ||
                b.floors.length === 0
              ) {

                throw new Error(
                  `Floors required for block ${b.blockName}`
                );
              }

              if (
                b.totalFloors !==
                b.floors.length
              ) {

                throw new Error(
                  `totalFloors mismatch in block ${b.blockName}`
                );
              }

              return {

                projectId: id,

                blockName:
                  b.blockName,

                totalFloors:
                  b.totalFloors,

                floors:
                  b.floors,

                updatedById:
                  data.updatedById
              };
            }
          );

        await tx.superStructure.createMany({
          data: superStructureData
        });
      }

      return project;
    }
  );
};

export const deleteProjectService = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: { id },
      data: { isActive: false }
    });

    await tx.superStructure.updateMany({
      where: { projectId: id },
      data: { isActive: false }
    });

    return { message: "Project deleted successfully" };
  });
};

export const getProjectDashboardService =
  async () => {

    const projects =
      await prisma.project.findMany({
        where: {
          isActive: true
        },

        include: {
          stages: true,

          landSiteInspection: {
            where: { isActive: true }
          },

          preConstructionInspections: {
            where: { isActive: true }
          },

          foundationProgresses: {
            where: { isActive: true }
          },

          foundationQualityChecks: {
            where: { isActive: true }
          },

          plinthStages: {
            where: { isActive: true }
          },

          interiorsProgress: {
            where: { isActive: true }
          },

          interiorsQuality: true,

          exteriorsProgress: {
            where: { isActive: true }
          },

          exteriorsQuality: true,

          BuildingInspection: {
            where: { isActive: true }
          },

          DevelopmentWork: {
            where: { isActive: true }
          },

          TakeoverBuildingInsepction: {
            where: { isActive: true }
          },

          TakeoverDevelopmentWork: {
            where: { isActive: true }
          },

          SuperStructureProgress: {
            where: { isActive: true }
          },

          superStructureQuality: true
        }
      });

    let assignedProjects = 0;

    let ongoingProjects = 0;

    let completedProjects = 0;

    let totalInspections = 0;

    let completedInspections = 0;

    let pendingInspections = 0;

    for (const p of projects) {

      const totalStages =
        p.stages.length;

      const completedStageNames: string[] =
        [];

      if (
        p.landSiteInspection.length > 0
      ) {
        completedStageNames.push(
          "Land Site Inspection"
        );
      }

      if (
        p.preConstructionInspections
          .length > 0
      ) {
        completedStageNames.push(
          "Pre Construction"
        );
      }

      if (
        p.foundationProgresses
          .length > 0 ||
        p.foundationQualityChecks
          .length > 0
      ) {
        completedStageNames.push(
          "Foundation"
        );
      }

      if (p.plinthStages.length > 0) {
        completedStageNames.push(
          "Plinth"
        );
      }

      if (
        p.SuperStructureProgress
          .length > 0 ||
        p.superStructureQuality
      ) {
        completedStageNames.push(
          "Super Structure"
        );
      }

      if (
        p.interiorsProgress.length >
          0 ||
        p.interiorsQuality
      ) {
        completedStageNames.push(
          "Interiors"
        );
      }

      if (
        p.exteriorsProgress.length >
          0 ||
        p.exteriorsQuality
      ) {
        completedStageNames.push(
          "Exteriors"
        );
      }

      if (
        p.BuildingInspection.length >
        0
      ) {
        completedStageNames.push(
          "Building Inspection"
        );
      }

      if (
        p.DevelopmentWork.length > 0
      ) {
        completedStageNames.push(
          "Development Work"
        );
      }

      if (
        p.TakeoverBuildingInsepction
          .length > 0
      ) {
        completedStageNames.push(
          "Takeover Building Inspection"
        );
      }

      if (
        p.TakeoverDevelopmentWork
          .length > 0
      ) {
        completedStageNames.push(
          "Takeover Development Work"
        );
      }

      const doneStages =
        completedStageNames.length;

      const pending =
        totalStages - doneStages > 0
          ? totalStages - doneStages
          : 0;

      totalInspections +=
        totalStages;

      completedInspections +=
        doneStages;

      pendingInspections +=
        pending;

      if (doneStages === 0) {

        assignedProjects++;

      } else if (
        doneStages > 0 &&
        pending > 0
      ) {

        ongoingProjects++;

      } else {

        completedProjects++;

      }
    }

    return {
      totalProjects:
        projects.length,

      assignedProjects,

      ongoingProjects,

      completedProjects,

      pendingProjects:
        assignedProjects +
        ongoingProjects,

      totalInspections,

      completedInspections,

      pendingInspections
    };
  };
export const getProjectByIdService = async (
  id: string
) => {

  const project = await prisma.project.findUnique({
    where: { id },  // ← findUnique can't add isActive here directly

    include: {
      district: true,
      specialUnit: true,
      department: true,
      officer: true,
      stages: true,
      assignedUser: true,
      SuperStructure: true,
      SuperStructureProgress: true
    }
  });

  // ✅ ADD THIS CHECK — reject deleted projects
  if (!project || !project.isActive) {
    throw new Error("Project not found");
  }

  return {
    id: project.id,
    code: project.code,
    projectName: project.projectName,
    locationName: project.locationName,
    status: project.status,
    districtName: project.district?.name ?? null,
    specialUnitName: project.specialUnit?.name ?? null,
    departmentName: project.department?.name ?? null,
    officerName: project.officer?.name ?? null,
    assignedUserId: project.assignedUserId,
    assignedUserName: project.assignedUser?.userName ?? null,
    selectedStageIds: project.selectedStageIds,
    stageNames: project.stages.map((s) => s.name),
    blocks: project.SuperStructure.map((b) => {
      const progress = project.SuperStructureProgress.find(
        (p) => p.blockName === b.blockName
      );
      return {
        blockName: b.blockName,
        totalFloors: b.totalFloors,
        currentFloor: progress?.floorName ?? null,
        status: progress?.status ?? "NOT_STARTED"
      };
    }),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
};


// export const getProjectsByUserService = async (userId: string) => {

//   const projects = await prisma.project.findMany({
//     where: {
//       assignedUserId: userId,
//       isActive: true
//     },
//     include: {
//       officer: true,
//       stages: true,
//       department: true,
//       specialUnit: true,
//       SuperStructure: true 
//     },
//     orderBy: { createdAt: "desc" }
//   });

//   return projects.map((p) => ({
//     id: p.id,
//     projectName: p.projectName,
//     locationName: p.locationName,

//     officerName: p.officer?.name ?? null,
//     unitName: p.department?.name || p.specialUnit?.name || null,

//     stageCount: p.stages.length,
//     selectedStageIds: p.selectedStageIds,

    
//     superStructure: p.SuperStructure.map((b) => ({
//       blockName: b.blockName,
//       totalFloors: b.totalFloors
//     })),

//     status: p.status,
//     createdAt: p.createdAt
//   }));
// };