import prisma from "../../shared/prisma";

// CREATE
export const createTakeoverDevelopmentWorkDB = async (
  data: any
) => {
  return prisma.takeoverDevelopmentWork.create({
    data,
  });
};

// GET ALL (LATEST FIRST)
export const getAllTakeoverDevelopmentWorkDB = async (
  projectId: string
) => {
  return prisma.takeoverDevelopmentWork.findMany({
    where: {
      projectId,
      isActive: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET BY ID
export const getTakeoverDevelopmentWorkByIdDB = async (
  id: string
) => {
  return prisma.takeoverDevelopmentWork.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
};

// GET LATEST BY PROJECT
export const getTakeoverDevelopmentWorkByProjectIdDB =
  async (projectId: string) => {
    return prisma.takeoverDevelopmentWork.findFirst({
      where: {
        projectId,
        isActive: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

// UPDATE
export const updateTakeoverDevelopmentWorkDB = async (
  id: string,
  data: any
) => {
  return prisma.takeoverDevelopmentWork.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteTakeoverDevelopmentWorkDB = async (
  id: string
) => {
  return prisma.takeoverDevelopmentWork.update({
    where: { id },

    data: {
      isActive: false,
    },
  });
};