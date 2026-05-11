import joi from "joi";

export const createBrandSchema = joi.object({
  name: joi.string().trim().required(),
  materialId: joi.string().uuid().required(),
});

export const updateBrandSchema = joi.object({
  name: joi.string().trim().optional(),
  materialId: joi.string().uuid().optional(),
});

export const brandIdSchema = joi.object({
  id: joi.string().uuid().required(),
});

export const listBrandSchema = joi.object({
  search: joi.string().optional(),
  materialId: joi.string().uuid().optional(),
  pageNumber: joi.number().optional(),
  pageSize: joi.number().optional(),
});