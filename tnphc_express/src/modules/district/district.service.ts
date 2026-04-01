import prisma from "../../shared/prisma";
import { pageConfig } from "../../utils/query.helper";


export const createDistrictService = async (data: {
  name: string;
//   createdById?: string;
}) => {
  // Auto-generate code
  const last = await prisma.district.findFirst({
    orderBy: { code: "desc" },
  });

  const nextCode = last ? last.code + 1 : 1;

  return prisma.district.create({
    data: {
      code: nextCode,
      name: data.name,
    //   createdById: data.createdById,
    },
  });
};

export const getAllDistrictsService =  async (query: any) => {
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

  const [data, totalRecords] = await Promise.all([
    prisma.district.findMany({
      where: whereCondition,
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true
      },
      orderBy: { createdAt: "asc" },
      skip,
      take,
    }),
    prisma.district.count({ where: whereCondition }),
  ]);

  return {
    totalRecords,
    data,
  };
};


export const getDistrictByIdService = async (id: string) => {
  return prisma.district.findUnique({
    where: { id },
  });
};

export const updateDistrictService = async (
  id: string,
  data: { name?: string; updatedById?: string }
) => {
  return prisma.district.update({
    where: { id },
    data: {
      name: data.name,
      updatedById: data.updatedById,
    },
  });
};

export const deleteDistrictService = async (id: string) => {
  return prisma.district.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};