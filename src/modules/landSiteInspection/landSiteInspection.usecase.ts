import {
  createInspectionDB,
  getAllInspectionDB,
  getInspectionByIdDB,
  updateInspectionDB,
  deleteInspectionDB
} from "./landSiteInspection.service";

export const createInspectionUsecase = async (data: any, userId?: string) => {
  if (data.treesPhoto && data.treesPhoto.length > 3) {
    throw new Error("Max 3 tree photos allowed");
  }

  return createInspectionDB({
    ...data,
    createdById: userId,
    treesPhoto: data.treesPhoto || []
  });
};

export const getAllInspectionUsecase = async (projectId: string) => {
  return getAllInspectionDB(projectId);
};

export const getInspectionByIdUsecase = async (id: string) => {
  const data = await getInspectionByIdDB(id);
  if (!data) throw new Error("Inspection not found");
  return data;
};

export const updateInspectionUsecase = async (id: string, data: any) => {
  if (data.treesPhoto && data.treesPhoto.length > 3) {
    throw new Error("Max 3 tree photos allowed");
  }

  return updateInspectionDB(id, data);
};

export const deleteInspectionUsecase = async (id: string) => {
  return deleteInspectionDB(id);
};