import joi from "joi";

export const createUserSchema = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    passwordTemp: joi.string().min(6).required(),
    roleId: joi.string().optional(),
    createdById: joi.string().optional(),
});

export const updateUserSchema = joi.object({
    userName: joi.string().optional(),
    email: joi.string().email().optional(),
    roleId: joi.string().optional()
});

export const getAllUsersSchema = joi.object({
    pageNumber: joi.number().integer().min(1).default(1),
    pageSize: joi.number().integer().min(1).max(100).default(10),
    search: joi.string().optional(),
    roleId: joi.string().optional()
});

export const getUserByIdSchema = joi.object({
    id: joi.string().required(),
});

export const deleteUserSchema = joi.object({
    id: joi.string().required()
});

export const updateParamsSchema = joi.object({
    id: joi.string().required(),
});

export const loginUserSchema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
});