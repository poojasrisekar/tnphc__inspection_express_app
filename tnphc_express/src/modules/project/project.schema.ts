import Joi from "joi";

export const createProjectSchema = Joi.object({
  districtId: Joi.string().required(),
  department: Joi.string().valid("POLICE", "PRISON", "FRS").required(),
  specialUnitId: Joi.string().required(),
  officers: Joi.string().valid("LEVEL1", "LEVEL2", "LEVEL3") .required(),
  locationName: Joi.string().required(),
  projectName: Joi.string().required(),
  stage: Joi.string()
    .valid(
      "LandSiteInspectionStage",
      "PreConstructionStage",
      "FoundationStage",
      "PlinthStage",
      "SuperStructureStage",
      "InteriorsStage",
      "ExteriorsStage",
      "DevelopmentWorksStage",
      "TakeOverStage"
    ).required(),
});

export const updateProjectSchema = Joi.object({
  department: Joi.string().valid("POLICE", "PRISON", "FRS").optional(),
  specialUnitId: Joi.string().optional(),
  officers: Joi.string().valid("LEVEL1", "LEVEL2", "LEVEL3").optional(),
  locationName: Joi.string().optional(),
  projectName: Joi.string().optional(),
  stage: Joi.string().optional(),
});

export const getProjectByIdSchema = Joi.object({
  id: Joi.string().required()
});

export const deleteProjectSchema = Joi.object({
  id: Joi.string().required()
});

export const getAllProjectsSchema = Joi.object({
  pageNumber: Joi.number().integer(),
  pageSize: Joi.number().integer(),
  search: Joi.string().optional()
});

export const updateParamsSchema = Joi.object({
  id: Joi.string().required()
});