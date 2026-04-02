import {
  createStageService,
  getAllStagesService,
  getStageByIdService,
  updateStageService,
  deleteStageService
} from "./stage.service";

// CREATE
export const createStageUsecase = async (data: any, user: any) => {
  return createStageService(data, user);
};

// GET ALL
export const getAllStagesUsecase = async () => {
  return getAllStagesService();
};

// GET BY ID
export const getStageByIdUsecase = async (id: string) => {
  return getStageByIdService(id);
};

// UPDATE
export const updateStageUsecase = async (
  id: string,
  data: any,
  user: any
) => {
  return updateStageService(id, data, user);
};

// DELETE
export const deleteStageUsecase = async (id: string, user: any) => {
  return deleteStageService(id, user);
};