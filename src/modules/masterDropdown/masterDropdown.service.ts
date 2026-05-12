import prisma from "../../shared/prisma";

// TYPE

export const createDropdownTypeService = async (
  data: any
) => {
  const existing =
    await prisma.masterDropdownType.findFirst({
      where: {
        OR: [
          {
            name: {
              equals: data.name,
              mode: "insensitive",
            },
          },
          {
            key: {
              equals: data.key,
              mode: "insensitive",
            },
          },
        ],
        isActive: true,
      },
    });

  if (existing) {
    throw new Error(
      "Dropdown type already exists"
    );
  }

  return prisma.masterDropdownType.create({
    data: {
      name: data.name,
      key: data.key,
      createdById: data.userId || null,
    },
  });
};

export const listDropdownTypesService =
  async () => {
    return prisma.masterDropdownType.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const getDropdownTypeByIdService =
  async (id: string) => {
    const type =
      await prisma.masterDropdownType.findFirst({
        where: {
          id,
          isActive: true,
        },
      });

    if (!type) {
      throw new Error(
        "Dropdown type not found"
      );
    }

    return type;
  };

export const updateDropdownTypeService =
  async (id: string, data: any) => {
    return prisma.masterDropdownType.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        key: data.key,
        updatedById: data.userId || null,
      },
    });
  };

export const deleteDropdownTypeService =
  async (id: string) => {
    return prisma.masterDropdownType.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  };

// CATEGORY

export const createDropdownCategoryService =
  async (data: any) => {
    return prisma.masterDropdownCategory.create({
      data: {
        typeId: data.typeId,
        label: data.label,
        value: data.value,
        sortOrder: data.sortOrder || 1,
        createdById: data.userId || null,
      },
    });
  };

export const getDropdownCategoryByIdService =
  async (id: string) => {
    const category =
      await prisma.masterDropdownCategory.findFirst({
        where: {
          id,
          isActive: true,
        },
      });

    if (!category) {
      throw new Error(
        "Dropdown category not found"
      );
    }

    return category;
  };

export const updateDropdownCategoryService =
  async (id: string, data: any) => {
    return prisma.masterDropdownCategory.update({
      where: {
        id,
      },
      data: {
        typeId: data.typeId,
        label: data.label,
        value: data.value,
        sortOrder: data.sortOrder,
        updatedById: data.userId || null,
      },
    });
  };

export const deleteDropdownCategoryService =
  async (id: string) => {
    return prisma.masterDropdownCategory.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  };

export const listDropdownCategoryByTypeService =
  async (key: string) => {
    return prisma.masterDropdownCategory.findMany(
      {
        where: {
          isActive: true,
          type: {
            key,
          },
        },
        orderBy: {
          sortOrder: "asc",
        },
      }
    );
  };