import { isAsyncFunction } from "node:util/types";
import prisma from "../../shared/prisma";
import { getInteriorsQualityByProjectService } from "../InteriorsStage/InteriorsStage.service";

export const createMaterialService = async (data: any) => {
  const existing = await prisma.material.findFirst({
    where: {
      name: {
        equals: data.name.trim(),
        mode: "insensitive",
      },
      isActive: true,
    },
  });

  if (existing) {
    throw new Error("Material already exists");
  }

  return prisma.material.create({
    data: {
      name: data.name.trim(),
      createdById: data.userId || null,
    },
  });
};

export const getMaterialByIdService = async (id: string) => {
  const material = await prisma.material.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      brands: {
        where: {
          isActive: true,
        },
        include: {
          grades: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!material) {
    throw new Error("Material not found");
  }

  return material;
};

export const updateMaterialService = async (
  id: string,
  data: any
) => {
  const existing = await prisma.material.findFirst({
    where: {
      name: {
        equals: data.name.trim(),
        mode: "insensitive",
      },
      NOT: {
        id,
      },
      isActive: true,
    },
  });

  if (existing) {
    throw new Error("Material already exists");
  }

  return prisma.material.update({
    where: { id },
    data: {
      name: data.name.trim(),
      updatedById: data.userId || null,
    },
  });
};

export const deleteMaterialService = async (id: string) => {
  return prisma.material.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
  console.log("Material with id", id, "marked as inactive");
};

export const listMaterialsService = async (query: any) => {
  console.log("QUERY =>", query);

  const pageNumber = Number(query.pageNumber) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const search = query.search?.trim();

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

  console.log("WHERE =>", where);

  const [data, total] = await Promise.all([
    prisma.material.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        brands: {
          where: {
            isActive: true,
          },
          include: {
            grades: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
    }),

    prisma.material.count({
      where,
    }),
  ]);

  return {
    total,
    pageNumber,
    pageSize,
    data,
  };
};