import joi from "joi";


export const createDistrictSchema = joi.object({
    name: joi.string().required()
});

export const updateDistrictSchema = joi.object({
    name: joi.string().optional()
});

export const getAllDistrictsSchema = joi.object({
    pageNumber: joi.number().integer(),
    pageSize: joi.number().integer(),
    search: joi.string().optional(),
});

export const getDistrictByIdSchema = joi.object({
    id: joi.string().required(),
});
export const deleteDistrictSchema = joi.object({
    id: joi.string().required(),
});
export const updateDistrictParamsSchema = joi.object({
    id: joi.string().required(),
});