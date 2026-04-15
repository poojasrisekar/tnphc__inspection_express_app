import prisma from "../../shared/prisma";

export const createInspectionDB = (data: any) => {
  return prisma.landSiteInspection.create({ data });
};

export const getAllInspectionDB = (projectId: string) => {
  return prisma.landSiteInspection.findMany({
    where: { projectId, isActive: true }
  });
};

export const getInspectionByIdDB = (id: string) => {
  return prisma.landSiteInspection.findUnique({ where: { id } });
};

export const updateInspectionDB = (id: string, data: any) => {
  return prisma.landSiteInspection.update({
    where: { id },
    data
  });
};

export const deleteInspectionDB = (id: string) => {
  return prisma.landSiteInspection.update({
    where: { id },
    data: { isActive: false }
  });
};