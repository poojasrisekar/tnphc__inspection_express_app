import {
  createDistrictService,
  getAllDistrictsService,
  getDistrictByIdService,
  updateDistrictService,
  deleteDistrictService,
} from "./district.service";

export const createDistrictUsecase = async (input: any) => {
  return createDistrictService(input);
};

export const getAllDistrictsUsecase = async ({
  pageNumber,
  pageSize,
  search,
}: {
  pageNumber?: string;
  pageSize?: string;
  search?: string;
}) => {
  return getAllDistrictsService({ pageNumber, pageSize, search });
};



export const getDistrictByIdUsecase = async (id: string) => {
  const district = await getDistrictByIdService(id);
  if (!district) throw new Error("District not found");
  return district;
};

export const updateDistrictUsecase = async (id: string, input: any) => {
  return updateDistrictService(id, input);
};

export const deleteDistrictUsecase = async (id: string) => {
  return deleteDistrictService(id);
};