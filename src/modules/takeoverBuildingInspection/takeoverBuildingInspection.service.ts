import prisma from "../../shared/prisma";

export const createTakeoverBuildingInspectionDB = (data: any) => {
  return prisma.takeoverBuildingInspection.create({ data });
};

export const getAllTakeoverBuildingInspectionDB = (projectId: string) => {
  return prisma.takeoverBuildingInspection.findMany({
    where: { projectId, isActive: true },
    orderBy: { createdAt: "desc" }
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

// Returns only the LATEST submission for a given project
export const getTakeoverBuildingInspectionByProjectIdDB = async (
  projectId: string
) => {
  const record = await prisma.takeoverBuildingInspection.findFirst({
    where: { projectId, isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
      createdById: true,
      updatedById: true,

      // STRUCTURE
      structure: true,

      // PAINTING
      painting: true,

      // TILING & FLOORING
      tilingFlooring: true,

      // FALSE CEILING
      falseCeiling: true,

      // PLUMBING SYSTEM
      plumbingSystem: true,

      // ELECTRICAL SYSTEM
      electricalSystem: true,

      // DOORS & WINDOWS
      doorsWindows: true,

      // LIFTS
      lifts: true,

      // FIRE FIGHTING SYSTEM
      fireFightingSystem: true,

      // TERRACE INSPECTION
      terraceInspection: true
    }
  });

  return record ? [record] : [];
};