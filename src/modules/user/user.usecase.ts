import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  loginService,
  getDepartmentsService,
  getDistrictsService,
  getRolesService,
  getSpecialUnitsService,  // ← ADD
} from "./user.service";

export const getAllUsersUsecase = async (filters?: any) => {
  return await getAllUsersService(filters);
};

export const getUserByIdUsecase = async (id: string) => {
  const user = await getUserByIdService(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const createUserUsecase = async (data: any) => {
  return await createUserService(data);
};

export const updateUserUsecase = async (id: string, data: any) => {
  return await updateUserService(id, data);
};

export const deleteUserUsecase = async (id: string, updatedById?: string) => {
  return await deleteUserService(id, updatedById);
};

export const loginUsecase = async (data: any) => {
  return loginService(data);
};

export const getDepartmentsUsecase = async () => getDepartmentsService();
export const getDistrictsUsecase = async () => getDistrictsService();
export const getRolesUsecase = async () => getRolesService();
export const getSpecialUnitsUsecase = async () => getSpecialUnitsService();  // ← ADD