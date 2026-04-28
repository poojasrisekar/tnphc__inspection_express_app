import prisma from "../../shared/prisma";

export const createExteriorsStageDB = (data: any) => {
  return prisma.exteriorsStage.create({ data });
};

export const getAllExteriorsStageDB = (projectId: string) => {
  return prisma.exteriorsStage.findMany({
    where: { projectId, isActive: true }
  });
};

export const getExteriorsStageByIdDB = (id: string) => {
  return prisma.exteriorsStage.findUnique({ where: { id } });
};

export const updateExteriorsStageDB = (id: string, data: any) => {
  return prisma.exteriorsStage.update({ where: { id }, data });
};

export const deleteExteriorsStageDB = (id: string) => {
  return prisma.exteriorsStage.update({
    where: { id },
    data: { isActive: false }
  });
};