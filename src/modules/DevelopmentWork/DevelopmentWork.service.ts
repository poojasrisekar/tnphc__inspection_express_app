import prisma from "../../shared/prisma";

export const createDevelopmentWorkDB = (data: any) => {
  return prisma.developmentWork.create({ data });
};

export const getAllDevelopmentWorkDB = (projectId: string) => {
  return prisma.developmentWork.findMany({
    where: { projectId, isActive: true }
  });
};

export const getDevelopmentWorkByIdDB = (id: string) => {
  return prisma.developmentWork.findUnique({ where: { id } });
};

export const updateDevelopmentWorkDB = (id: string, data: any) => {
  return prisma.developmentWork.update({ where: { id }, data });
};

export const deleteDevelopmentWorkDB = (id: string) => {
  return prisma.developmentWork.update({
    where: { id },
    data: { isActive: false }
  });
};