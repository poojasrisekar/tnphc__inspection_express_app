import prisma from "../../shared/prisma";

export const createBrandService = async (data: any) => {
  return prisma.brand.create({
    data: {
      name: data.name,
      materialId: data.materialId,
      createdById: data.userId || null,
    },
  });
};

export const getBrandByIdService = async (id: string) => {
  return prisma.brand.findUnique({
    where: { id },
  include: {
        material: {
          select: {
            id:true,
            code: true,
            name: true,
          },
        },
      },
  });
};

export const updateBrandService = async (id: string, data: any) => {
  return prisma.brand.update({
    where: { id },
    data: {
      name: data.name,
      materialId: data.materialId,
      updatedById: data.userId || null,
    },
  });
};

export const deleteBrandService = async (id: string) => {
  return prisma.brand.update({
    where: { id },
    data: {
      isActive: false, // soft delete
    },
  });
};

export const listBrandsService = async (query: any) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    search,
    materialId,
  } = query;

  const skip = (pageNumber - 1) * pageSize;

  const where: any = {
    isActive: true,
  };

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (materialId) {
    where.materialId = materialId; // 🔥 filter by material
  }

  const [data, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "asc" },
      include: {
        material: {
          select: {
            id:true,
            code: true,
            name: true,
          },
        },
      },
    }),
    prisma.brand.count({ where }),
  ]);

  return {
    data,
    total,
    pageNumber,
    pageSize,
  };
};


