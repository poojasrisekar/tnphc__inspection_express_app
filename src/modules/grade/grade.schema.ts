import joi from "joi";

export const createGradeSchema = joi.object({
  name: joi.string().trim().required(),
  brandId: joi.string().uuid().required(),
});

export const updateGradeSchema = joi.object({
  name: joi.string().trim().optional(),
  brandId: joi.string().uuid().optional(),
});

export const gradeIdSchema = joi.object({
  id: joi.string().uuid().required(),
});

export const listGradeSchema = joi.object({
  search: joi.string().optional(),
  brandId: joi.string().uuid().optional(),
  pageNumber: joi.number().optional(),
  pageSize: joi.number().optional(),
});