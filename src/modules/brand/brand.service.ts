import prisma from "../../shared/prisma";

import { Prisma } from "@prisma/client";

export const createBrandService = async (data: any) => {
  const material = await prisma.material.findFirst({
    where: {
      id: data.materialId,
      isActive: true,
    },
  });

  if (!material) {
    throw new Error("Material not found");
  }

  const existing = await prisma.brand.findFirst({
    where: {
      materialId: data.materialId,
      name: {
        equals: data.name.trim(),
        mode: "insensitive",
      },
      isActive: true,
    },
  });

  if (existing) {
    throw new Error(
      "Brand already exists for this material"
    );
  }

  try {
    return await prisma.brand.create({
      data: {
        name: data.name.trim(),
        materialId: data.materialId,
        createdById: data.userId || null,
      },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Duplicate brand code found");
    }

    throw error;
  }
};

export const getBrandByIdService = async (
  id: string
) => {
  const brand = await prisma.brand.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      material: true,
      grades: {
        where: {
          isActive: true,
        },
      },
    },
  });

  if (!brand) {
    throw new Error("Brand not found");
  }

  return brand;
};

export const updateBrandService = async (
  id: string,
  data: any
) => {
  const existing = await prisma.brand.findFirst({
    where: {
      materialId: data.materialId,
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
      "Brand already exists for this material"
    );
  }

  return prisma.brand.update({
    where: { id },
    data: {
      name: data.name,
      materialId: data.materialId,
      updatedById: data.userId || null,
    },
  });
};

export const deleteBrandService = async (
  id: string
) => {
  return prisma.brand.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};

export const listBrandsService = async (
  query: any
) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    search,
    materialId,
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

  if (materialId) {
    where.materialId = materialId;
  }

  const [data, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      skip,
      take: Number(pageSize),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        material: true,
        grades: {
          where: {
            isActive: true,
          },
        },
      },
    }),

    prisma.brand.count({ where }),
  ]);

  return {
    total,
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
    data,
  };
};