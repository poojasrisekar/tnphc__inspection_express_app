import prisma from "../../shared/prisma";

// ✅ CREATE STAGE
export const createStageService = async (data: any, user: any) => {
  // Check duplicate
  const existing = await prisma.stage.findFirst({
    where: {
      name: data.name,
      isActive: true
    }
  });

  if (existing) {
    throw new Error("Stage already exists");
  }

  return prisma.stage.create({
    data: {
      name: data.name,
      createdById: user.userId
    }
  });
};

// ✅ GET ALL STAGES
export const getAllStagesService = async () => {
  return prisma.stage.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      code: "asc"
    }
  });
};

// ✅ GET STAGE BY ID
export const getStageByIdService = async (id: string) => {
  const stage = await prisma.stage.findUnique({
    where: { id }
  });

  if (!stage || !stage.isActive) {
    throw new Error("Stage not found");
  }

  return stage;
};

// ✅ UPDATE STAGE
export const updateStageService = async (
  id: string,
  data: any,
  user: any
) => {
  // Check exists
  const existing = await prisma.stage.findUnique({
    where: { id }
  });

  if (!existing || !existing.isActive) {
    throw new Error("Stage not found");
  }

  // Check duplicate name
  const duplicate = await prisma.stage.findFirst({
    where: {
      name: data.name,
      NOT: { id }
    }
  });

  if (duplicate) {
    throw new Error("Stage name already used");
  }

  return prisma.stage.update({
    where: { id },
    data: {
      name: data.name,
      updatedById: user.userId
    }
  });
};

// ✅ DELETE STAGE (SOFT DELETE)
export const deleteStageService = async (id: string, user: any) => {
  const existing = await prisma.stage.findUnique({
    where: { id }
  });

  if (!existing || !existing.isActive) {
    throw new Error("Stage not found");
  }

  return prisma.stage.update({
    where: { id },
    data: {
      isActive: false,
      updatedById: user.userId
    }
  });
};