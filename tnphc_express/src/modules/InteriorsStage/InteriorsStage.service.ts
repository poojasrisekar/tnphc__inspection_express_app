import prisma from "../../shared/prisma";

export const createInteriorsStageDB = (data: any) => {
  return prisma.interiorsStage.create({ data });
};

export const getAllInteriorsStageDB = (projectId: string) => {
  return prisma.interiorsStage.findMany({
    where: { projectId, isActive: true }
  });
};

export const getInteriorsStageByIdDB = (id: string) => {
  return prisma.interiorsStage.findUnique({ where: { id } });
};

export const updateInteriorsStageDB = (id: string, data: any) => {
  return prisma.interiorsStage.update({ where: { id }, data });
};

export const deleteInteriorsStageDB = (id: string) => {
  return prisma.interiorsStage.update({
    where: { id },
    data: { isActive: false }
  });
};