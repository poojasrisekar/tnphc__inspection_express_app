import { status, superStructureStatus} from "@prisma/client";
import { pageConfig } from "../../utils/query.helper";
import prisma from "../../shared/prisma";




export const createProjectService = async (data: any) => {
  console.log("req ------------->>> ",data)
  if (data.officerId) {
    const officerExists = await prisma.officer.findUnique({
      where: { id: data.officerId }
    });
    if (!officerExists) throw new Error("Invalid officerId");
  }
  console.log("req ------------->>> id",data.officerId)

  if (!data.departmentId && !data.specialUnitId) {
    throw new Error("At least one of departmentId or specialUnitId is required");
  }

  const stageData =
    Array.isArray(data.stageId) && data.stageId.length > 0
      ? { stages: { connect: data.stageId.map((id: string) => ({ id })) } }
      : {};
  console.log("req ------------->>>  stageData",stageData)

  return await prisma.$transaction(async (tx) => {
    console.log("")
    // 1. Create Project
    const project = await tx.project.create({
      data: {
        districtId: data.districtId,
        departmentId: data.departmentId || null,
        specialUnitId: data.specialUnitId || null,
        officerId: data.officerId,
        locationName: data.locationName,
        projectName: data.projectName,
        ...stageData,
        status: status.AssignedProjects,
        createdById: data.createdById
      }
    });
  console.log("req ------------->>> project ",project)
  console.log("req ------------->>>  superStructure",data?.superStructure)
    // 2. Insert SuperStructure blocks only
    if (Array.isArray(data.superStructure) && data.superStructure.length > 0) {
     const a = await tx.superStructure.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: project.id,
          blockName: b.blockName,
          totalFloors: b.totalFloors,
          createdById: data.createdById
        }))
      });
      console.log(a)
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
    specialUnitId
  } = query;

  const { skip, take } = pageConfig({
    pageNumber,
    pageSize,
  });

  if (departmentId && specialUnitId) {
    throw new Error("Provide either departmentId OR specialUnitId, not both");
  }

  const whereCondition: any = { isActive: true };

  if (districtId) whereCondition.districtId = districtId;

  if (search) {
    whereCondition.projectName = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (status) whereCondition.status = status;
  if (departmentId) whereCondition.departmentId = departmentId;
  if (specialUnitId) whereCondition.specialUnitId = specialUnitId;

  const [data, totalRecords] = await Promise.all([
    prisma.project.findMany({
      where: whereCondition,
      include: {
        officer: true,
        stages: true,
        department: true,
        specialUnit: true,
        SuperStructure: true 
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.project.count({ where: whereCondition }),
  ]);

  const formattedData = data.map((p) => ({
    id: p.id,
    projectName: p.projectName,
    locationName: p.locationName,
    officerName: p.officer?.name ?? null,

    unitName: p.department?.name || p.specialUnit?.name || null,
    stage: p.stages?.[0]?.name ?? null,
    status: p.status,

    
    totalBlocks: p.SuperStructure.length,
    totalFloors: p.SuperStructure.reduce((sum, b) => sum + b.totalFloors, 0),

    createdAt: p.createdAt
  }));

  return {
    totalRecords,
    data: formattedData,
  };
};


export const getProjectByIdService = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      district: true,
      specialUnit: true,
      department: true,
      officer: true,
      stages: true,

      SuperStructure: true,
      SuperStructureProgress: true
    }
  });

  if (!project) throw new Error("Project not found");

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

    stageNames: project.stages.map((s) => s.name),

    // 🔥 SUPERSTRUCTURE DATA
    blocks: project.SuperStructure.map((b) => {
      const progress = project.SuperStructureProgress.find(
        (p) => p.blockName === b.blockName
      );

      return {
        blockName: b.blockName,
        totalFloors: b.totalFloors,
        currentFloor: progress?.currentFloor ?? null,
        status: progress?.status ?? "NOT_STARTED"
      };
    }),

    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
};



export const updateProjectService = async (id: string, data: any) => {
  return prisma.$transaction(async (tx) => {
    if (data.officerId) {
      const officerExists = await tx.officer.findUnique({
        where: { id: data.officerId }
      });
      if (!officerExists) throw new Error("Invalid officerId");
    }

    let stageData = {};
    if (Array.isArray(data.stageId)) {
      stageData = { stages: { set: data.stageId.map((id: string) => ({ id })) } };
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
        ...stageData,
        updatedById: data.updatedById
      }
    });

    // Update SuperStructure blocks only (no progress)
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
  const [
    totalProjects,
    assignedProjects,
    ongoingProjects,
    completedProjects,

    totalBlocks,
    inProgressBlocks,
    completedBlocks
  ] = await Promise.all([
    prisma.project.count({ where: { isActive: true } }),

    prisma.project.count({
      where: { isActive: true, status: "AssignedProjects" },
    }),

    prisma.project.count({
      where: { isActive: true, status: "OngoingProjects" },
    }),

    prisma.project.count({
      where: { isActive: true, status: "CompletedProjects" },
    }),

    
    prisma.superStructure.count({
      where: { isActive: true }
    }),

    prisma.superStructureProgress.count({
      where: {
        isActive: true,
        status: superStructureStatus.IN_PROGRESS
      }
    }),

    prisma.superStructureProgress.count({
      where: {
        isActive: true,
        status: superStructureStatus.COMPLETED
      }
    }),
  ]);

  return {
    totalProjects,
    assignedProjects,
    ongoingProjects,
    completedProjects,

    // 🔥 extra insights
    totalBlocks,
    inProgressBlocks,
    completedBlocks
  };
};