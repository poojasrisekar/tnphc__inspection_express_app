import joi from "joi";

export const createOfficerSchema = joi.object({
    name:joi.string().required(),

});

export const updateOfficerSchema = joi.object({
    name:joi.string().optional(),
});

export const getOfficerByIdSchema = joi.object({
    id: joi.string().required(),
});
export const deleteOfficerSchema = joi.object({
    id: joi.string().required(),
});

export const listOfficersSchema = joi.object({
    pageNumber: joi.number().integer().min(1).max(100).default(10),
    pageSize: joi.number().integer().min(1).default(1),
    search: joi.string().optional(),
});
export const updateOfficerParamsSchema = joi.object({
    id: joi.string().required(),
});