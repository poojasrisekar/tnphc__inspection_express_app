import joi from 'joi';

export const stageSchema = joi.object({
  name: joi.string().required(),
});

export const stageUpdateSchema = joi.object({
  name: joi.string().required(),
});

export const getStageSchema = joi.object({
    pageNumber: joi.number().integer().min(1).max(100).default(10),
    pageSize: joi.number().integer().min(1).default(1),
    search: joi.string().optional(),});

  export const getStageByIdSchema = joi.object({
    id: joi.string().required(),
  });
  export const deleteStageSchema = joi.object({
    id: joi.string().required(),
  });
  export const updateStageParamsSchema = joi.object({
    id: joi.string().required(),
  });