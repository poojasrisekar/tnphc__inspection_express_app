import prisma from "../../shared/prisma";

export const createBuildingInspectionDB = (data: any) => {
  return prisma.buildingInspection.create({ data });
};

export const getAllBuildingInspectionDB = (projectId: string) => {
  return prisma.buildingInspection.findMany({
    where: { projectId, isActive: true }
  });
};

export const getBuildingInspectionByProjectIdDB = (
  projectId: string
) => {
  return prisma.buildingInspection.findMany({
    where: {
      projectId,
      isActive: true
    }
  });
};

export const updateBuildingInspectionDB = (id: string, data: any) => {
  return prisma.buildingInspection.update({ where: { id }, data });
};

export const deleteBuildingInspectionDB = (id: string) => {
  return prisma.buildingInspection.update({
    where: { id },
    data: { isActive: false }
  });
};