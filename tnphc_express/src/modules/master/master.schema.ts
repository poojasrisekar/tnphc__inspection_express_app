import joi from "joi";

export const masterSchema = joi.object({
  materialName: joi.string().required(),
  brandId: joi.string().required(),
  gradeId: joi.string().required(),
});

export const updateMasterSchema = joi.object({
  materialName: joi.string(),
  brandId: joi.string(),
  gradeId: joi.string(),
});

export const getMasterByIdSchema = joi.object({
  id: joi.string().required(),
});

export const updateMasterParamsSchema = joi.object({
  id: joi.string().required(),
});

export const listMastersSchema = joi.object({
  pageNumber: joi.number().integer(),
  pageSize: joi.number().integer(),
  search: joi.string().optional(),
  brandId: joi.string().optional(),
  gradeId: joi.string().optional(),
});