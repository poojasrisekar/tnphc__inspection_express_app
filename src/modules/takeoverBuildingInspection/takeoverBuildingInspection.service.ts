import prisma from "../../shared/prisma";

export const createTakeoverBuildingInspectionDB = (data: any) => {
  return prisma.takeoverBuildingInspection.create({ data });
};

export const getAllTakeoverBuildingInspectionDB = (projectId: string) => {
  return prisma.takeoverBuildingInspection.findMany({
    where: { projectId, isActive: true }
  });
};

export const getTakeoverBuildingInspectionByIdDB = (id: string) => {
  return prisma.takeoverBuildingInspection.findUnique({ where: { id } });
};

export const updateTakeoverBuildingInspectionDB = (id: string, data: any) => {
  return prisma.takeoverBuildingInspection.update({ where: { id }, data });
};

export const deleteTakeoverBuildingInspectionDB = (id: string) => {
  return prisma.takeoverBuildingInspection.update({
    where: { id },
    data: { isActive: false }
  });
};
export const getTakeoverBuildingInspectionByProjectIdDB = (
  projectId: string
) => {
  return prisma.takeoverBuildingInspection.findMany({
    where: {
      projectId,
      isActive: true
    }
  });
};