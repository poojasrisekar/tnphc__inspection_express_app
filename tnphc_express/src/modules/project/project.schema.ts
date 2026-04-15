import { status } from "@prisma/client";
import Joi from "joi";
import { stat } from "node:fs";

export const createProjectSchema = Joi.object({
  districtId: Joi.string().required(),
  departmentId: Joi.string().optional(),
  specialUnitId: Joi.string().optional(),
  officerId: Joi.string().required(),
  locationName: Joi.string().required(),
  projectName: Joi.string().required(),
  stageId: Joi.array()
  .items(Joi.string().required())
  .min(1)
  .required()});

export const updateProjectSchema = Joi.object({
  districtId: Joi.string().optional(),
  departmentId: Joi.string().optional(),
  specialUnitId: Joi.string().optional(),
  officerId: Joi.string().optional(),
  locationName: Joi.string().optional(),
  projectName: Joi.string().optional(),
  stage: Joi.array()
  .items(Joi.string().required())
  .min(1)
  .optional(),
  status: Joi.string().valid("AssignedProjects", "TotalProjects", "OngoingProjects","CompletedProjects").optional()
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
  search: Joi.string().optional(),
  status: Joi.string().valid("AssignedProjects", "TotalProjects", "OngoingProjects","CompletedProjects").optional(),
  districtId: Joi.string().optional(),
  departmentId: Joi.string().optional(),
  specialUnitId: Joi.string().optional()
});

export const updateParamsSchema = Joi.object({
  id: Joi.string().required()
});