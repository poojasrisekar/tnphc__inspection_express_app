import {
  createRoleService,
  getAllRolesService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService,
} from "./roles.service";

/**
 * Create Role
 */
export const createRoleUsecase = async (data: any) => {
  return createRoleService(data);
};

/**
 * Get All Roles
 */
export const getAllRolesUsecase = async (query: any) => {
  const { pageNumber, pageSize, search } = query;

  return getAllRolesService(pageNumber, pageSize, search);
};

/**
 * Get Role By ID
 */
export const getRoleByIdUsecase = async (id: string) => {
  return getRoleByIdService(id);
};

/**
 * Update Role
 */
export const updateRoleUsecase = async (id: string, data: any) => {
  return updateRoleService(id, data);
};

/**
 * Delete Role
 */
export const deleteRoleUsecase = async (id: string) => {
  return deleteRoleService(id);
};