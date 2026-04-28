import prisma from "../../shared/prisma";

export const createMaterialService = async (data: any) => {
  return prisma.material.create({
    data: {
      name: data.name,
      createdById: data.userId || null,
    },
  });
};

export const getMaterialByIdService = async (id: string) => {
  return prisma.material.findUnique({
    where: { id },
  });
};

export const updateMaterialService = async (id: string, data: any) => {
  return prisma.material.update({
    where: { id },
    data: {
      name: data.name,
      updatedById: data.userId || null,
    },
  });
};

export const deleteMaterialService = async (id: string) => {
  return prisma.material.update({
    where: { id },
    data: {
      isActive: false, // soft delete
    },
  });
};

export const listMaterialsService = async (query: any) => {
  const { pageNumber = 1, pageSize = 10, search } = query;

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

  const [data, total] = await Promise.all([
    prisma.material.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "asc" },
    }),
    prisma.material.count({ where }),
  ]);

  return {
    data,
    total,
    pageNumber,
    pageSize,
  };
};


export const getMaterials = async (query: any) => {
  const { search, materialId, brandId, gradeId } = query;

  const where: any = {
    isActive: true,
  };

  // 🔍 Search
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // 🎯 Material filter
  if (materialId) {
    where.id = materialId;
  }

  // 🔥 RELATION FILTER (MERGED CORRECTLY)
  if (brandId || gradeId) {
    where.brands = {
      some: {
        ...(brandId && { id: brandId }),
        ...(gradeId && {
          grades: {
            some: {
              id: gradeId,
            },
          },
        }),
      },
    };
  }

  return prisma.material.findMany({
    where,
    include: {
      brands: {
        include: {
          grades: true,
        },
      },
    },
  });
};