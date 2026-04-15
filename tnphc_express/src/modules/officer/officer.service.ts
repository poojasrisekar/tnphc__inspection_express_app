import prisma from "../../shared/prisma";
import { pageConfig } from "../../utils/query.helper";

export const createOfficerDB = (data: any) => {
  return prisma.officer.create({ data });
};

export const getOfficerByIdDB = (id: string) => {
  return prisma.officer.findUnique({ where: { id } });
};

export const updateOfficerDB = (id: string, data: any) => {
  return prisma.officer.update({
    where: { id },
    data,
  });
};

export const deleteOfficerDB = (id: string) => {
  // ✅ Soft delete
  return prisma.officer.update({
    where: { id },
    data: { isActive: false },
  });
};

export const getAllOfficersService = async (query: any) => {
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
    prisma.officer.findMany({
      where: whereCondition,
      orderBy: { createdAt: "asc" }, // same as project
      skip,
      take,
    }),
    prisma.officer.count({
      where: whereCondition,
    }),
  ]);

  return {
    totalRecords,
    data,
  };
};