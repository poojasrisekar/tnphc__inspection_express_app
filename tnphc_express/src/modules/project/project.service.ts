import { status, DepartmentEnum, OfficersEnum  } from "@prisma/client";
import { pageConfig } from "../../utils/query.helper";
import prisma from "../../shared/prisma";

export const createProjectService = async (data: any) => {
  return prisma.project.create({
    data: {
      districtId: data.districtId,

      department: DepartmentEnum[data.department as keyof typeof DepartmentEnum],
      specialUnitId: data.specialUnitId,
      officers: OfficersEnum[data.officers as keyof typeof OfficersEnum],
      locationName: data.locationName,
      projectName: data.projectName,

      // ✅ Use FK instead of enum
      stageId: data.stageId,

      status: status.AssignedProjects,
      createdById: data.createdById
    }
  });
};

export const getAllProjectsService = async (query: any) => {
  const { pageNumber, pageSize, search } = query;

  const { skip, take } = pageConfig({
    pageNumber,
    pageSize,
  });

  const whereCondition = {
    isActive: true,
    ...(search && {
      projectName: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [data, totalRecords] = await Promise.all([
    prisma.project.findMany({
      where: whereCondition,
      orderBy: { createdAt: "asc" },
      skip,
      take,
    }),
    prisma.project.count({
      where: whereCondition,
    }),
  ]);

  return {
    totalRecords,
    data,
  };
};
export const getProjectByIdService = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      district: true,
      specialUnit: true,
      stage: true
    }
  });

  if (!project) throw new Error("Project not found");

  return {
    id: project.id,
    code: project.code,
    projectName: project.projectName,
    locationName: project.locationName,
    department: project.department,
    officers: project.officers,
    status: project.status,

    // ✅ Flattened names
    districtName: project.district?.name,
    specialUnitName: project.specialUnit?.name,
    stageName: project.stage?.name,

    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
};

export const updateProjectService = async (id: string, data: any) => {
  return prisma.project.update({
    where: { id },
    data: {
      ...data,
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