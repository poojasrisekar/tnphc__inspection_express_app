import prisma from "../../shared/prisma";

export const createGradeService = async (data: any) => {
  return prisma.grade.create({
    data: {
      name: data.name,
      brandId: data.brandId,
      createdById: data.userId || null,
    },
  });
};

export const getGradeByIdService = async (id: string) => {
  return prisma.grade.findUnique({
    where: { id },
    include: {
      brand: {
        include: {
          material: true, // 🔥 useful for UI cards
        },
      },
    },
  });
};

export const updateGradeService = async (id: string, data: any) => {
  return prisma.grade.update({
    where: { id },
    data: {
      name: data.name,
      brandId: data.brandId,
      updatedById: data.userId || null,
    },
  });
};

export const deleteGradeService = async (id: string) => {
  return prisma.grade.update({
    where: { id },
    data: {
      isActive: false, // soft delete
    },
  });
};

export const listGradesService = async (query: any) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    search,
    brandId,
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

  if (brandId) {
    where.brandId = brandId; // 🔥 dropdown filter
  }

  const [data, total] = await Promise.all([
    prisma.grade.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            material: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.grade.count({ where }),
  ]);

  return {
    data,
    total,
    pageNumber,
    pageSize,
  };
};