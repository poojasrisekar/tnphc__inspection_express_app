import prisma from "../../shared/prisma";

export const createPreConstructionDB = (data: any) => {
  return prisma.preConstructionInspection.create({ data });
};

export const getAllPreConstructionDB = (projectId: string) => {
  return prisma.preConstructionInspection.findMany({
    where: {
      projectId,
      isActive: true
    },
    orderBy: { createdAt: "desc" }
  });
};

export const getPreConstructionByIdDB = (id: string) => {
  return prisma.preConstructionInspection.findFirst({
    where: {
      id,
      isActive: true
    }
  });
};

export const updatePreConstructionDB = (id: string, data: any) => {
  return prisma.preConstructionInspection.update({
    where: { id },
    data
  });
};

export const deletePreConstructionDB = (id: string) => {
  return prisma.preConstructionInspection.update({
    where: { id },
    data: { isActive: false }
  });
};