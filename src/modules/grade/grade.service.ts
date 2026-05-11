import prisma from "../../shared/prisma";

export const createGradeService = async (data: any) => {
  const brand = await prisma.brand.findFirst({
    where: {
      id: data.brandId,
      isActive: true,
    },
  });

  if (!brand) {
    throw new Error("Brand not found");
  }

  const existing = await prisma.grade.findFirst({
    where: {
      brandId: data.brandId,
      name: {
        equals: data.name,
        mode: "insensitive",
      },
      isActive: true,
    },
  });

  if (existing) {
    throw new Error(
      "Grade already exists for this brand"
    );
  }

  return prisma.grade.create({
    data: {
      name: data.name,
      brandId: data.brandId,
      createdById: data.userId || null,
    },
  });
};

export const getGradeByIdService = async (
  id: string
) => {
  const grade = await prisma.grade.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      brand: {
        include: {
          material: true,
        },
      },
    },
  });

  if (!grade) {
    throw new Error("Grade not found");
  }

  return grade;
};

export const updateGradeService = async (
  id: string,
  data: any
) => {
  const grade = await prisma.grade.findFirst({
    where: {
      id,
      isActive: true,
    },
  });

  if (!grade) {
    throw new Error("Grade not found");
  }

  const existing = await prisma.grade.findFirst({
    where: {
      brandId: data.brandId,
      name: {
        equals: data.name,
        mode: "insensitive",
      },
      NOT: {
        id,
      },
      isActive: true,
    },
  });

  if (existing) {
    throw new Error(
      "Grade already exists for this brand"
    );
  }

  return prisma.grade.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      brandId: data.brandId,
      updatedById: data.userId || null,
    },
  });
};

export const deleteGradeService = async (
  id: string
) => {
  return prisma.grade.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

export const listGradesService = async (
  query: any
) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    search,
    brandId,
  } = query;

  const skip =
    (Number(pageNumber) - 1) * Number(pageSize);

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
    where.brandId = brandId;
  }

  const [data, total] = await Promise.all([
    prisma.grade.findMany({
      where,
      skip,
      take: Number(pageSize),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        brand: {
          include: {
            material: true,
          },
        },
      },
    }),

    prisma.grade.count({
      where,
    }),
  ]);

  return {
    total,
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
    data,
  };
};