import prisma from "../../shared/prisma";

// CREATE
export const createDevelopmentWorkDB = async (data: any) => {
  return prisma.developmentWork.create({
    data,
  });
};

// GET ALL BY PROJECT (LATEST FIRST)
export const getAllDevelopmentWorkDB = async (
  projectId: string
) => {
  return prisma.developmentWork.findMany({
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
export const getDevelopmentWorkByIdDB = async (
  id: string
) => {
  return prisma.developmentWork.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
};

// GET LATEST BY PROJECT ID
export const getDevelopmentWorkByProjectIdDB = async (
  projectId: string
) => {
  return prisma.developmentWork.findFirst({
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
export const updateDevelopmentWorkDB = async (
  id: string,
  data: any
) => {
  return prisma.developmentWork.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteDevelopmentWorkDB = async (
  id: string
) => {
  return prisma.developmentWork.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};