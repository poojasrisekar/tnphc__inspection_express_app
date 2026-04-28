import joi from "joi";

export const createSpecialUnitSchema = joi.object({
    name: joi.string().required()});

export const updateSpecialUnitSchema = joi.object({
    name: joi.string().optional()});

export const getSpecialUnitByIdSchema = joi.object({
    id: joi.string().required()});

export const deleteSpecialUnitSchema = joi.object({
    id: joi.string().required()
});

export const getAllSpecialUnitsSchema = joi.object({
    pageNumber: joi.number().integer(),
    pageSize: joi.number().integer(),
    search: joi.string().optional()});

    export const updateParamsSchema = joi.object({
        id: joi.string().required(),
    });