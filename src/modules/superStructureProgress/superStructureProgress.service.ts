import prisma from "../../shared/prisma";

export const getSuperStructureProgressViewService = async (
  projectId: string
) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      SuperStructure: true, // ❌ REMOVE where filter
      SuperStructureProgress: true
    }
  });

  if (!project) throw new Error("Project not found");

  const blocks = project.SuperStructure.map((block) => {
    const progress = project.SuperStructureProgress.find(
      (p) => p.blockName === block.blockName
    );

    return {
      blockName: block.blockName,
      totalFloors: block.totalFloors,

      // 🔥 IMPORTANT FIX
      floors: block.floors ?? [],

      currentFloor: progress?.currentFloor ?? 0,
      status: progress?.status ?? "NOT_STARTED",

      isStarted: !!progress
    };
  });

  return {
    projectId: project.id,
    projectName: project.projectName,
    locationName: project.locationName,

    totalBlocks: blocks.length,

    blocks
  };
};

// ✅ CREATE
export const createSuperStructureProgressDB = (data: any) => {
  return prisma.superStructureProgress.create({ data });
};

// ✅ UPDATE
export const updateSuperStructureProgressDB = (id: string, data: any) => {
  return prisma.superStructureProgress.update({
    where: { id },
    data
  });
};