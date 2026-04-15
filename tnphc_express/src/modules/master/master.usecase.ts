import {
  createMasterService,
  getMasterByIdService,
  updateMasterService,
  deleteMasterService,
  listMastersService,
} from "./master.service";

export const createMasterUsecase = async (data: any) => {
  return createMasterService(data);
};

export const getMasterByIdUsecase = async (id: string) => {
  const master = await getMasterByIdService(id);
  if (!master) throw new Error("Master not found");
  return master;
};

export const updateMasterUsecase = async (id: string, data: any) => {
  return updateMasterService(id, data);
};

export const deleteMasterUsecase = async (id: string) => {
  return deleteMasterService(id);
};

export const listMastersUsecase = async (query: any) => {
  return listMastersService(query);
};