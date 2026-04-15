import joi from "joi";

export const gradeSchema = joi.object({
  name: joi.string().required(),
  brandId: joi.string().required(),
});

export const updateGradeSchema = joi.object({
  name: joi.string(),
  // brandId: joi.string(),
});

export const getGradeByIdSchema = joi.object({
  id: joi.string().required(),
});

export const updateGradeParamsSchema = joi.object({
  id: joi.string().required(),
});

export const listGradesSchema = joi.object({
  pageNumber: joi.number().integer(),
  pageSize: joi.number().integer(),
  search: joi.string().optional(),
  brandId: joi.string().optional(), // 🔥 important for dropdown
});