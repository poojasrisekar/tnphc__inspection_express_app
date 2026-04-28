import joi from "joi";

export const materialSchema = joi.object({
    name: joi.string().required(),});

export const updateMaterialSchema = joi.object({
    name: joi.string(),
});

export const getMaterialById = joi.object({
    id: joi.string().required(),
});

export const updateMaterialParamsSchema = joi.object({
    id: joi.string().required(),
});

export const listMaterialsSchema = joi.object({
  pageNumber: joi.number().integer(),
  pageSize: joi.number().integer(),
  search: joi.string().optional(),
});

export const getMaterialsSchema = joi.object({
  materialId: joi.string().uuid().optional(),
  brandId: joi.string().uuid().optional(),
  gradeId: joi.string().uuid().optional(),
  search: joi.string().optional(),
});