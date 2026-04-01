// usecases/specialUnit.usecase.ts

import {
  createSpecialUnitService,
  getAllSpecialUnitsService,
  getSpecialUnitByIdService,
  updateSpecialUnitService,
  deleteSpecialUnitService
} from "./specialUnits.service";

export const createSpecialUnitUsecase = async (data: any) => {
  return await createSpecialUnitService(data);
};

export const getAllSpecialUnitsUsecase = async (query: any) => {
  return await getAllSpecialUnitsService(query);
};

export const getSpecialUnitByIdUsecase = async (id: string) => {
  const result = await getSpecialUnitByIdService(id);

  if (!result) {
    throw new Error("Special Unit not found");
  }

  return result;
};

export const updateSpecialUnitUsecase = async (id: string, data: any) => {
  return await updateSpecialUnitService(id, data);
};

export const deleteSpecialUnitUsecase = async (id: string) => {
  return await deleteSpecialUnitService(id);
};