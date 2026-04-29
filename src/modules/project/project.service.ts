import { status, SuperStructureStatus} from "@prisma/client";
import { pageConfig } from "../../utils/query.helper";
import prisma from "../../shared/prisma";




export const createProjectService = async (data: any) => {
  // ✅ Validate officer
  if (data.officerId) {
    const officerExists = await prisma.officer.findUnique({
      where: { id: data.officerId }
    });

    if (!officerExists) {
      throw new Error("Invalid officerId");
    }
  }

  // ✅ NEW LOGIC (both allowed)
  if (!data.departmentId && !data.specialUnitId) {
    throw new Error("At least one of departmentId or specialUnitId is required");
  }

  // ✅ Stage handling
  const stageData =
    Array.isArray(data.stageId) && data.stageId.length > 0
      ? {
          stages: {
            connect: data.stageId.map((id: string) => ({ id }))
          }
        }
      : {};

  // 🔥 TRANSACTION
  return await prisma.$transaction(async (tx) => {
    console.log("tx keys:", Object.keys(tx).filter(k => k.includes('uper')));
    // ✅ 1. Create Project
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

    // ✅ 2. Insert SuperStructure
    if (Array.isArray(data.superStructure) && data.superStructure.length > 0) {
      await tx.superStructure.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: project.id,
          blockName: b.blockName,
          totalFloors: b.totalFloors,
          createdById: data.createdById
        }))
      });

      // ✅ 3. Insert default progress
      await tx.superStructureProgress.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: project.id,
          blockName: b.blockName,
          currentFloor: null,
          status: SuperStructureStatus.NOT_STARTED,
          createdById: data.createdById
        }))
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
        SuperStructure: true // 🔥 ADD
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

    // 🔥 ADD SUMMARY
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
    // ✅ Validate officer
    if (data.officerId) {
      const officerExists = await tx.officer.findUnique({
        where: { id: data.officerId }
      });
      if (!officerExists) throw new Error("Invalid officerId");
    }

    // ✅ Stage update
    let stageData = {};
    if (Array.isArray(data.stageId)) {
      stageData = {
        stages: {
          set: data.stageId.map((id: string) => ({ id }))
        }
      };
    }

    // ✅ Update Project
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

    // 🔥 SUPERSTRUCTURE UPDATE
    if (Array.isArray(data.superStructure)) {
      // 1. Delete old
      await tx.superStructure.deleteMany({ where: { projectId: id } });
      await tx.superStructureProgress.deleteMany({ where: { projectId: id } });

      // 2. Insert new
      await tx.superStructure.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: id,
          blockName: b.blockName,
          totalFloors: b.totalFloors
        }))
      });

      // 3. Reset progress
      await tx.superStructureProgress.createMany({
        data: data.superStructure.map((b: any) => ({
          projectId: id,
          blockName: b.blockName,
          currentFloor: null,
          status: SuperStructureStatus.NOT_STARTED
        }))
      });
    }

    return project;
  });
};

export const deleteProjectService = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    // 1. Soft delete project
    await tx.project.update({
      where: { id },
      data: { isActive: false }
    });

    // 2. Soft delete SuperStructure
    await tx.superStructure.updateMany({
      where: { projectId: id },
      data: { isActive: false }
    });

    // 3. Soft delete SuperStructureProgress
    await tx.superStructureProgress.updateMany({
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

    // 🔥 NEW METRICS
    prisma.superStructure.count({
      where: { isActive: true }
    }),

    prisma.superStructureProgress.count({
      where: {
        isActive: true,
        status: SuperStructureStatus.IN_PROGRESS
      }
    }),

    prisma.superStructureProgress.count({
      where: {
        isActive: true,
        status: SuperStructureStatus.COMPLETED
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