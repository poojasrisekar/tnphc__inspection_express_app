import { status} from "@prisma/client";
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

  // ✅ Validate either department OR specialUnit
  if (data.departmentId && data.specialUnitId) {
    throw new Error("Provide either departmentId OR specialUnitId, not both");
  }

  if (!data.departmentId && !data.specialUnitId) {
    throw new Error("Either departmentId OR specialUnitId is required");
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

  return prisma.project.create({
    data: {
      districtId: data.districtId,

      // ✅ only one will be stored
      departmentId: data.departmentId || null,
      specialUnitId: data.specialUnitId || null,

      officerId: data.officerId || null,

      locationName: data.locationName,
      projectName: data.projectName,

      ...stageData,

      status: status.AssignedProjects,
      createdById: data.createdById
    },
    include: {
      department: true,
      specialUnit: true
    }
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

  const whereCondition: any = {
    isActive: true
  };

  if (districtId) {
    whereCondition.districtId = districtId;
  }

  if (search) {
    whereCondition.projectName = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (status) {
    whereCondition.status = status; // ✅ status filter works here
  }

  if (departmentId) {
    whereCondition.departmentId = departmentId;
  }

  if (specialUnitId) {
    whereCondition.specialUnitId = specialUnitId;
  }

  // console.log("FINAL WHERE:", whereCondition);

  const [data, totalRecords] = await Promise.all([
    prisma.project.findMany({
      where: whereCondition,
      include: {
        officer: true,
        stages: true,
        department: true,
        specialUnit: true
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.project.count({ where: whereCondition }),
  ]);

  // ✅ FORMAT RESPONSE (IMPORTANT 🔥)
  const formattedData = data.map((p) => ({
    id: p.id,
    projectName: p.projectName,
    locationName: p.locationName,

    officerName: p.officer?.name ?? null,

    districtId: p.districtId,
    departmentId: p.departmentId,
    specialUnitId: p.specialUnitId,

    // ✅ show only one (better for UI)
    unitName: p.department?.name || p.specialUnit?.name || null,

    stage: p.stages?.[0]?.name ?? null,

    // ✅ STATUS (this is what you want to filter & display)
    status: p.status,

    createdAt: p.createdAt
  }));

  return {
    totalRecords,
    data: formattedData, // ✅ IMPORTANT
  };
};
export const getProjectByIdService = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      district: true,
      specialUnit: true,
      stages: true,
      department: true,
      officer: true
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

    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
};

export const updateProjectService = async (id: string, data: any) => {

  // ✅ Validate officer (if provided)
  if (data.officerId) {
    const officerExists = await prisma.officer.findUnique({
      where: { id: data.officerId }
    });

    if (!officerExists) {
      throw new Error("Invalid officerId");
    }
  }

  // ✅ Handle stages update
  let stageData = {};

  if (Array.isArray(data.stageId)) {
    stageData = {
      stages: {
        set: data.stageId.map((id: string) => ({ id })) // 🔥 replaces all stages
      }
    };
  }

  return prisma.project.update({
    where: { id },
    data: {
      districtId: data.districtId,
      departmentId: data.departmentId,
      specialUnitId: data.specialUnitId,
      officerId: data.officerId,

      locationName: data.locationName,
      projectName: data.projectName,
      status: data.status,

      ...stageData, // ✅ stage handling

      updatedById: data.updatedById
    }
  });
};

export const deleteProjectService = async (id: string) => {
  return prisma.project.update({
    where: { id },
    data: { isActive: false }
  });
};


export const getProjectDashboardService = async () => {
  const [
    totalProjects,
    assignedProjects,
    ongoingProjects,
    completedProjects
  ] = await Promise.all([
    prisma.project.count({
      where: { isActive: true },
    }),

    prisma.project.count({
      where: { isActive: true, status: "AssignedProjects" },
    }),

    prisma.project.count({
      where: { isActive: true, status: "OngoingProjects" },
    }),

    prisma.project.count({
      where: { isActive: true, status: "CompletedProjects" },
    }),
  ]);

  return {
    totalProjects,
    assignedProjects,
    ongoingProjects,
    completedProjects,
  };
};