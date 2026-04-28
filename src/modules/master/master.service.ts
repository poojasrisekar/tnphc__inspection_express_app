import prisma from "../../shared/prisma";

export const createMasterService = async (data: any) => {
  return prisma.master.create({
    data: {
      materialName: data.materialName,
      brandId: data.brandId,
      gradeId: data.gradeId,
      createdById: data.userId || null,
    },
  });
};

export const getMasterByIdService = async (id: string) => {
  return prisma.master.findUnique({
    where: { id },
    include: {
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
      grade: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const updateMasterService = async (id: string, data: any) => {
  return prisma.master.update({
    where: { id },
    data: {
      materialName: data.materialName,
      brandId: data.brandId,
      gradeId: data.gradeId,
      updatedById: data.userId || null,
    },
  });
};

export const deleteMasterService = async (id: string) => {
  return prisma.master.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};

export const listMastersService = async (query: any) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    search,
    brandId,
    gradeId,
  } = query;

  const skip = (pageNumber - 1) * pageSize;

  const where: any = {
    isActive: true,
  };

  if (search) {
    where.materialName = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (brandId) {
    where.brandId = brandId;
  }

  if (gradeId) {
    where.gradeId = gradeId;
  }

  const [data, total] = await Promise.all([
    prisma.master.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "asc" },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        grade: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.master.count({ where }),
  ]);

  return {
      total,
      pageNumber,
      pageSize,
      data,
  };
};