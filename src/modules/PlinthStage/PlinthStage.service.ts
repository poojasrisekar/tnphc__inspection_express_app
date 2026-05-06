import prisma from "../../shared/prisma";

export const createPlinthStageDB = (data: any) => {
  return prisma.plinthStage.create({ data });
};

export const getAllPlinthStageDB = (projectId: string) => {
  return prisma.plinthStage.findMany({
    where: { projectId, isActive: true }
  });
};

export const getPlinthStageByIdDB = (
  projectId: string
) => {
  return prisma.plinthStage.findFirst({
    where: {
      projectId,
      isActive: true
    }
  });
};

export const updatePlinthStageDB = (id: string, data: any) => {
  return prisma.plinthStage.update({ where: { id }, data });
};

export const deletePlinthStageDB = (id: string) => {
  return prisma.plinthStage.update({
    where: { id },
    data: { isActive: false }
  });
};