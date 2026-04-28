import Joi from "joi";

export const createRoleSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255).optional(),
});

export const updateRoleSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  description: Joi.string().max(255).optional()
});

export const getAllRolesSchema = Joi.object({
  pageNumber: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().optional(),
});

export const getRoleByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const deleteRoleSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateRoleParamsSchema = Joi.object({
  id: Joi.string().required(),
});