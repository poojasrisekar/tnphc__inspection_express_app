// services/specialUnit.service.ts

import prisma from "../../shared/prisma";
import { pageConfig } from "../../utils/query.helper";

export const createSpecialUnitService = async (data: any) => {
  return prisma.specialUnits.create({
    data: {
      name: data.name,
      createdById: data.createdById
    }
  });
};

export const getAllSpecialUnitsService = async (query: any) => {
  const { pageNumber, pageSize, search } = query;

  const { skip, take } = pageConfig({
    pageNumber,
    pageSize
  });

  const whereCondition = {
    isActive: true,
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive"
      }
    })
  };

  const [data, totalCount] = await Promise.all([
    prisma.specialUnits.findMany({
      where: whereCondition,
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true
      },
      orderBy: { name: "asc" },
      skip,
      take
    }),
    prisma.specialUnits.count({
      where: whereCondition
    })
  ]);

  return {
    totalCount,
    data,
  };

};
export const getSpecialUnitByIdService = async (id: string) => {
  return prisma.specialUnits.findUnique({
    where: { id }
  });
};

export const updateSpecialUnitService = async (id: string, data: any) => {
  return prisma.specialUnits.update({
    where: { id },
    data: {
      name: data.name,
      updatedById: data.updatedById
    }
  });
};

export const deleteSpecialUnitService = async (id: string) => {
  return prisma.specialUnits.update({
    where: { id },
    data: {
      isActive: false
    }
  });
};

