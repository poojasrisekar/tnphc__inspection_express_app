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

  stageId: Joi.array().items(Joi.string().required()).min(1).required(),

  
  superStructure: Joi.array()
    .items(
      Joi.object({
        blockName: Joi.string().required(),
        totalFloors: Joi.number().integer().min(1).required()
      })
    )
    .optional()
});

export const updateProjectSchema = Joi.object({
  districtId: Joi.string().optional(),
  departmentId: Joi.string().optional(),
  specialUnitId: Joi.string().optional(),
  officerId: Joi.string().optional(),
  locationName: Joi.string().optional(),
  projectName: Joi.string().optional(),

  // ❌ stage → FIX
  stageId: Joi.array().items(Joi.string().required()).optional(),

  status: Joi.string()
    .valid("AssignedProjects", "TotalProjects", "OngoingProjects", "CompletedProjects")
    .optional(),

  // 🔥 ADD THIS
  superStructure: Joi.array()
    .items(
      Joi.object({
        blockName: Joi.string().required(),
        totalFloors: Joi.number().integer().min(1).required()
      })
    )
    .optional()
});

export const getProjectByIdSchema = Joi.object({
  id: Joi.string().uuid().required()
});

export const deleteProjectSchema = Joi.object({
  id: Joi.string().uuid().required()
});



export const updateParamsSchema = Joi.object({
  id: Joi.string().uuid().required()
});

export const getAllProjectsSchema = Joi.object({
  pageNumber: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(10),

  search: Joi.string().trim().optional(),

  status: Joi.string()
    .valid(
      "AssignedProjects",
      "TotalProjects",
      "OngoingProjects",
      "CompletedProjects"
    )
    .optional(),

  districtId: Joi.string().uuid().optional(),
  departmentId: Joi.string().uuid().optional(),
  specialUnitId: Joi.string().uuid().optional(),

})
//  BEST CHOICE (explained below)
.nand("departmentId", "specialUnitId")
.required();