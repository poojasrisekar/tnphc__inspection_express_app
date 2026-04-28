import prisma from "../../shared/prisma";
import { pageConfig } from "../../utils/query.helper";

export const createDepartmentDB = (data: any) => {
  return prisma.department.create({ data });
};

export const getDepartmentByIdDB = (id: string) => {
  return prisma.department.findUnique({ where: { id } });
};

export const updateDepartmentDB = (id: string, data: any) => {
  return prisma.department.update({
    where: { id },
    data,
  });
};

export const deleteDepartmentDB = (id: string) => {
  return prisma.department.delete({
    where: { id },
  });
};

export const getAllDepartmentsService = async (query: any) => {
  const { pageNumber, pageSize, search } = query;

  const { skip, take } = pageConfig({
    pageNumber,
    pageSize,
  });

  const whereCondition: any = {
    isActive: true,

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [data, totalRecords] = await Promise.all([
    prisma.department.findMany({
      where: whereCondition,
      orderBy: { createdAt: "asc" }, // same as project
      skip,
      take,
    }),
    prisma.department.count({
      where: whereCondition,
    }),
  ]);

  return {
    totalRecords,
    data,
  };
};