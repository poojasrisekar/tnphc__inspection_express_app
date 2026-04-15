import {
  createBrandService,
  getBrandByIdService,
  updateBrandService,
  deleteBrandService,
  listBrandsService,
} from "./brand.service";

export const createBrandUsecase = async (data: any) => {
  return createBrandService(data);
};

export const getBrandByIdUsecase = async (id: string) => {
  const brand = await getBrandByIdService(id);
  if (!brand) throw new Error("Brand not found");
  return brand;
};

export const updateBrandUsecase = async (id: string, data: any) => {
  return updateBrandService(id, data);
};

export const deleteBrandUsecase = async (id: string) => {
  return deleteBrandService(id);
};

export const listBrandsUsecase = async (query: any) => {
  return listBrandsService(query);
};