import {
  createDepartmentDB,
  getDepartmentByIdDB,
  updateDepartmentDB,
  deleteDepartmentDB,
  getAllDepartmentsService,
} from "./department.service";

export const createDepartmentUsecase = async (data: any) => {
  return createDepartmentDB(data);
};

export const getDepartmentByIdUsecase = async (id: string) => {
  const dept = await getDepartmentByIdDB(id);
  if (!dept) throw new Error("Department not found");
  return dept;
};

export const updateDepartmentUsecase = async (id: string, data: any) => {
  return updateDepartmentDB(id, data);
};

export const deleteDepartmentUsecase = async (id: string) => {
  return deleteDepartmentDB(id);
};

export const listDepartmentsUsecase = async (query: any) => {
  const { pageNumber, pageSize, search } = query;
  return getAllDepartmentsService(query);
};