import prisma from "../../shared/prisma";

export const createFoundationQualityCheckDB = (data: any) => {
  return prisma.foundationQualityCheck.create({ data });
};

export const getAllFoundationQualityCheckDB = (projectId: string) => {
  return prisma.foundationQualityCheck.findMany({
    where: { projectId, isActive: true }
  });
};

export const getFoundationQualityCheckByIdDB = (id: string) => {
  return prisma.foundationQualityCheck.findUnique({ where: { id } });
};

export const updateFoundationQualityCheckDB = (id: string, data: any) => {
  return prisma.foundationQualityCheck.update({ where: { id }, data });
};

export const deleteFoundationQualityCheckDB = (id: string) => {
  return prisma.foundationQualityCheck.update({
    where: { id },
    data: { isActive: false }
  });
};