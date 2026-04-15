import joi from "joi";

export const brandSchema = joi.object({
  name: joi.string().required(),
  materialId: joi.string().required(),
});

export const updateBrandSchema = joi.object({
  name: joi.string(),
  // materialId: joi.string(),
});

export const getBrandByIdSchema = joi.object({
  id: joi.string().required(),
});

export const updateBrandParamsSchema = joi.object({
  id: joi.string().required(),
});

export const listBrandsSchema = joi.object({
  pageNumber: joi.number().integer(),
  pageSize: joi.number().integer(),
  search: joi.string().optional(),
  materialId: joi.string().optional(), // 🔥 important for dropdown
});