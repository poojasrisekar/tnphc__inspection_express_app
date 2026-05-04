import {
  createInspectionService,
  updateInspectionService,
  getAllInspectionService,
  getInspectionByIdService,
  deleteInspectionService
} from "./landSiteInspection.service";

export const createInspectionUsecase = async (
  data: any,
  files: any[],
  userId: string,
  baseUrl: string
) => {
  return createInspectionService(data, files, userId, baseUrl);
};

export const updateInspectionUsecase = async (
  id: string,
  data: any,
  files: any[],
  baseUrl: string
) => {
  return updateInspectionService(id, data, files, baseUrl);
};

export const getAllInspectionUsecase = async (projectId: string) => {
  return getAllInspectionService(projectId);
};

export const getInspectionByIdUsecase = async (id: string) => {
  const data = await getInspectionByIdService(id);
  if (!data) throw new Error("Inspection not found");
  return data;
};

export const deleteInspectionUsecase = async (id: string) => {
  return deleteInspectionService(id);
};