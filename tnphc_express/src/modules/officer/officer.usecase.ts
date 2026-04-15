import {
  createOfficerDB,
  getOfficerByIdDB,
  updateOfficerDB,
  deleteOfficerDB,
  getAllOfficersService,
} from "./officer.service";

export const createOfficerUsecase = async (data: any, userId?: string) => {
  return createOfficerDB({
    ...data,
    createdById: userId,
  });
};

export const getOfficerByIdUsecase = async (id: string) => {
  const officer = await getOfficerByIdDB(id);
  if (!officer || !officer.isActive) {
    throw new Error("Officer not found");
  }
  return officer;
};

export const updateOfficerUsecase = async (
  id: string,
  data: any,
  userId?: string
) => {
  return updateOfficerDB(id, {
    ...data,
    updatedById: userId,
  });
};

export const deleteOfficerUsecase = async (id: string) => {
  return deleteOfficerDB(id);
};

export const listOfficersUsecase = async (query: any) => {
  const { pageNumber, pageSize, search } = query;
  return getAllOfficersService(query);
};