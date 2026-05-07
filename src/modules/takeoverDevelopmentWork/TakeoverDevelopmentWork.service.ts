import prisma from "../../shared/prisma";

export const createTakeoverDevelopmentWorkDB = (data: any) => {
  return prisma.takeoverDevelopmentWork.create({ data });
};

export const getAllTakeoverDevelopmentWorkDB = (projectId: string) => {
  return prisma.takeoverDevelopmentWork.findMany({
    where: { projectId, isActive: true }
  });
};

export const getTakeoverDevelopmentWorkByIdDB = (id: string) => {
  return prisma.takeoverDevelopmentWork.findUnique({ where: { id } });
};

export const updateTakeoverDevelopmentWorkDB = (id: string, data: any) => {
  return prisma.takeoverDevelopmentWork.update({ where: { id }, data });
};

export const deleteTakeoverDevelopmentWorkDB = (id: string) => {
  return prisma.takeoverDevelopmentWork.update({
    where: { id },
    data: { isActive: false }
  });
};

export const getTakeoverDevelopmentWorkByProjectIdDB = (
  projectId: string
) => {
  return prisma.takeoverDevelopmentWork.findMany({
    where: {
      projectId,
      isActive: true
    }
  });
};