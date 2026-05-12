import joi from "joi";

export const createDropdownTypeSchema = joi.object({
  name: joi.string().trim().required(),
  key: joi.string().trim().required(),
});

export const updateDropdownTypeSchema = joi.object({
  name: joi.string().trim().optional(),
  key: joi.string().trim().optional(),
});

export const createDropdownCategorySchema = joi.object({
  typeId: joi.string().uuid().required(),
  label: joi.string().trim().required(),
  value: joi.string().trim().required(),
  sortOrder: joi.number().optional(),
});

export const updateDropdownCategorySchema = joi.object({
  typeId: joi.string().uuid().optional(),
  label: joi.string().trim().optional(),
  value: joi.string().trim().optional(),
  sortOrder: joi.number().optional(),
});

export const dropdownIdSchema = joi.object({
  id: joi.string().uuid().required(),
});