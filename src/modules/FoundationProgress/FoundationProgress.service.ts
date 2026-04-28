import prisma from "../../shared/prisma";

export const createFoundationProgressDB = (data: any) => {
  return prisma.foundationProgress.create({ data });
};

export const getAllFoundationProgressDB = (projectId: string) => {
  return prisma.foundationProgress.findMany({
    where: { projectId, isActive: true }
  });
};

export const getFoundationProgressByIdDB = (id: string) => {
  return prisma.foundationProgress.findUnique({ where: { id } });
};

export const updateFoundationProgressDB = (id: string, data: any) => {
  return prisma.foundationProgress.update({ where: { id }, data });
};

export const deleteFoundationProgressDB = (id: string) => {
  return prisma.foundationProgress.update({
    where: { id },
    data: { isActive: false }
  });
};