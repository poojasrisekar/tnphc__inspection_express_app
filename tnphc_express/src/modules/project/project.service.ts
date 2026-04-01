import { status, DepartmentEnum, OfficersEnum, StageEnum  } from "@prisma/client";
import { pageConfig } from "../../utils/query.helper";
import prisma from "../../shared/prisma";

export const createProjectService = async (data: any) => {
  return prisma.project.create({
    data: {
      districtId: data.districtId,

      // ✅ Enum usage
      department: DepartmentEnum[data.department as keyof typeof DepartmentEnum],
      specialUnitId: data.specialUnitId,
      officers: OfficersEnum[data.officers as keyof typeof OfficersEnum],
      locationName: data.locationName,
      projectName: data.projectName,
      stage: StageEnum[data.stage as keyof typeof StageEnum],

      // ✅ Default status
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
  return prisma.project.findUnique({
    where: { id },
    // include: {
    //   district: true,
    //   specialUnit: true
    // }
  });
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