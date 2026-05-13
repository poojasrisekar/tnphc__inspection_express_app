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

export const getProjectsByUserService = async (
  userId?: string
) => {

  const whereCondition: any = {
    isActive: true
  };

  if (userId) {
    whereCondition.assignedUserId = userId;
  }

  const projects = await prisma.project.findMany({
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
    }
  });

  return projects.map((p) => {

    const totalAssignedStages =
      p.stages.length;

    const completedStages = [

      p.landSiteInspection.length,

      p.preConstructionInspections.length,

      p.foundationProgresses.length,

      p.foundationQualityChecks.length,

      p.plinthStages.length,

      p.interiorsProgress.length,

      p.interiorsQuality ? 1 : 0,

      p.exteriorsProgress.length,

      p.exteriorsQuality ? 1 : 0,

      p.BuildingInspection.length,

      p.DevelopmentWork.length,

      p.TakeoverBuildingInsepction.length,

      p.TakeoverDevelopmentWork.length,

      p.SuperStructureProgress.length,

      p.superStructureQuality ? 1 : 0

    ].reduce((a, b) => a + b, 0);

    const pendingStages =
      totalAssignedStages - completedStages > 0
        ? totalAssignedStages - completedStages
        : 0;

    let projectStatus = "AssignedProjects";

    if (
      completedStages > 0 &&
      pendingStages > 0
    ) {
      projectStatus = "OngoingProjects";
    }

    if (
      completedStages >= totalAssignedStages &&
      totalAssignedStages > 0
    ) {
      projectStatus = "CompletedProjects";
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

      pendingStages,

      inspectionDoneCount:
        completedStages,

      inspectionPendingCount:
        pendingStages,

      selectedStageIds:
        p.selectedStageIds,

      superStructure:
        p.SuperStructure.map((b) => ({
          blockName: b.blockName,
          totalFloors: b.totalFloors
        })),

      status: projectStatus,

      createdAt: p.createdAt
    };
  });
};

export const updateProjectService = async (id: string, data: any) => {
  return prisma.$transaction(async (tx) => {
    if (data.officerId) {
      const officerExists = await tx.officer.findUnique({
        where: { id: data.officerId }
      });
      if (!officerExists) throw new Error("Invalid officerId");
    }

    
    if (data.assignedUserId) {
      const userExists = await tx.user.findUnique({
        where: { id: data.assignedUserId }
      });
      if (!userExists) throw new Error("Invalid assignedUserId");
    }

    let stageData = {};
    if (Array.isArray(data.stageId)) {
      stageData = {
        stages: { set: data.stageId.map((id: string) => ({ id })) }
      };
    }

    const project = await tx.project.update({
      where: { id },
      data: {
        districtId: data.districtId,
        departmentId: data.departmentId,
        specialUnitId: data.specialUnitId,
        officerId: data.officerId,
        locationName: data.locationName,
        projectName: data.projectName,
        status: data.status,

        
        assignedUserId: data.assignedUserId,
        selectedStageIds: data.stageId,

        ...stageData,
        updatedById: data.updatedById
      }
    });

    if (Array.isArray(data.superStructure)) {
      await tx.superStructure.deleteMany({ where: { projectId: id } });

      await tx.superStructure.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: id,
          blockName: b.blockName,
          totalFloors: b.totalFloors,
          updatedById: data.updatedById
        }))
      });
    }

    return project;
  });
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

export const getProjectDashboardService = async () => {

  const projects = await prisma.project.findMany({
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

    const doneStages = [

      p.landSiteInspection.length,

      p.preConstructionInspections.length,

      p.foundationProgresses.length,

      p.foundationQualityChecks.length,

      p.plinthStages.length,

      p.interiorsProgress.length,

      p.interiorsQuality ? 1 : 0,

      p.exteriorsProgress.length,

      p.exteriorsQuality ? 1 : 0,

      p.BuildingInspection.length,

      p.DevelopmentWork.length,

      p.TakeoverBuildingInsepction.length,

      p.TakeoverDevelopmentWork.length,

      p.SuperStructureProgress.length,

      p.superStructureQuality ? 1 : 0

    ].reduce((a, b) => a + b, 0);

    const pending =
      totalStages - doneStages > 0
        ? totalStages - doneStages
        : 0;

    totalInspections += totalStages;

    completedInspections += doneStages;

    pendingInspections += pending;

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
    totalProjects: projects.length,

    assignedProjects,

    ongoingProjects,

    completedProjects,

    pendingProjects:
      assignedProjects + ongoingProjects,

    totalInspections,

    completedInspections,

    pendingInspections
  };
};
export const getProjectByIdService = async (
  id: string
) => {

  const project = await prisma.project.findUnique({
    where: { id },

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

  if (!project) {
    throw new Error("Project not found");
  }

  return {
    id: project.id,
    code: project.code,

    projectName: project.projectName,

    locationName: project.locationName,

    status: project.status,

    districtName:
      project.district?.name ?? null,

    specialUnitName:
      project.specialUnit?.name ?? null,

    departmentName:
      project.department?.name ?? null,

    officerName:
      project.officer?.name ?? null,

    assignedUserId:
      project.assignedUserId,

    assignedUserName:
      project.assignedUser?.userName ?? null,

    selectedStageIds:
      project.selectedStageIds,

    stageNames:
      project.stages.map((s) => s.name),

    blocks:
      project.SuperStructure.map((b) => {

        const progress =
          project.SuperStructureProgress.find(
            (p) => p.blockName === b.blockName
          );

        return {
          blockName: b.blockName,

          totalFloors: b.totalFloors,

          currentFloor:
            progress?.floorName ?? null,

          status:
            progress?.status ?? "NOT_STARTED"
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