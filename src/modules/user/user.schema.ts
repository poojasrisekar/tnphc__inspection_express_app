import joi from "joi";

export const createUserSchema = joi.object({
  userName: joi.string().max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  roleId: joi.string().optional(),
  departmentId: joi.string().optional(),
  districtId: joi.string().optional(),
  officerId: joi.string().optional(),
  createdById: joi.string().optional(),
});

export const updateUserSchema = joi.object({
  userName: joi.string().max(15).optional(),
  email: joi.string().email().optional(),
  passwordTemp: joi.string().min(6).optional(), // editable by admin
  roleId: joi.string().optional(),
  departmentId: joi.string().optional(),
  districtId: joi.string().optional(),
  officerId: joi.string().optional(),
  updatedById: joi.string().optional(),
});

export const getAllUsersSchema = joi.object({
  pageNumber: joi.number().integer().min(1).default(1),
  pageSize: joi.number().integer().min(1).max(100).default(10),
  search: joi.string().optional().allow(""),
  roleId: joi.string().optional(),
  departmentId: joi.string().optional(),
  districtId: joi.string().optional(),
});

export const getUserByIdSchema = joi.object({
  id: joi.string().required(),
});

export const deleteUserSchema = joi.object({
  id: joi.string().required(),
});

export const updateParamsSchema = joi.object({
  id: joi.string().required(),
});

export const loginUserSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
});