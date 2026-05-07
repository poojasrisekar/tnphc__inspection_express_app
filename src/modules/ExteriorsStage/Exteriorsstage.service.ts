import prisma from "../../shared/prisma";

export const createExteriorsStageDB = (data: any) => {
  return prisma.exteriorsStage.create({ data });
};

export const getAllExteriorsStageDB = (projectId: string) => {
  return prisma.exteriorsStage.findMany({
    where: { projectId, isActive: true }
  });
};

export const getExteriorsStageByIdDB = (
  projectId: string
) => {
  return prisma.exteriorsStage.findFirst({
    where: {
      projectId,
      isActive: true
    }
  });
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