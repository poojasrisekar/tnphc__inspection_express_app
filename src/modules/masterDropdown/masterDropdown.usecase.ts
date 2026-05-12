import * as service from "./masterDropdown.service";

// TYPE

export const createDropdownTypeUsecase =
  async (data: any) => {
    return service.createDropdownTypeService(
      data
    );
  };

export const listDropdownTypesUsecase =
  async () => {
    return service.listDropdownTypesService();
  };

export const getDropdownTypeByIdUsecase =
  async (id: string) => {
    return service.getDropdownTypeByIdService(
      id
    );
  };

export const updateDropdownTypeUsecase =
  async (id: string, data: any) => {
    return service.updateDropdownTypeService(
      id,
      data
    );
  };

export const deleteDropdownTypeUsecase =
  async (id: string) => {
    return service.deleteDropdownTypeService(
      id
    );
  };

// CATEGORY

export const createDropdownCategoryUsecase =
  async (data: any) => {
    return service.createDropdownCategoryService(
      data
    );
  };

export const getDropdownCategoryByIdUsecase =
  async (id: string) => {
    return service.getDropdownCategoryByIdService(
      id
    );
  };

export const updateDropdownCategoryUsecase =
  async (id: string, data: any) => {
    return service.updateDropdownCategoryService(
      id,
      data
    );
  };

export const deleteDropdownCategoryUsecase =
  async (id: string) => {
    return service.deleteDropdownCategoryService(
      id
    );
  };

export const listDropdownCategoryByTypeUsecase =
  async (key: string) => {
    return service.listDropdownCategoryByTypeService(
      key
    );
  };