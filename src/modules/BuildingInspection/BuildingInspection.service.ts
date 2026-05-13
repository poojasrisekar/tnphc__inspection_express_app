import prisma from "../../shared/prisma";

export const createBuildingInspectionDB = (data: any) => {
  return prisma.buildingInspection.create({ data });
};

export const getAllBuildingInspectionDB = (projectId: string) => {
  return prisma.buildingInspection.findMany({
    where: { projectId, isActive: true },
    orderBy: { createdAt: "desc" }
  });
};

// Returns only the LATEST submission for a given project
export const getBuildingInspectionByProjectIdDB = async (projectId: string) => {
  const record = await prisma.buildingInspection.findFirst({
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

export const updateBuildingInspectionDB = (id: string, data: any) => {
  return prisma.buildingInspection.update({ where: { id }, data });
};

export const deleteBuildingInspectionDB = (id: string) => {
  return prisma.buildingInspection.update({
    where: { id },
    data: { isActive: false }
  });
};