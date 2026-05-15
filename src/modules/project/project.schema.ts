
import Joi from "joi";



export const createProjectSchema = Joi.object({
  districtId: Joi.string().required(),

  departmentId: Joi.string().optional(),
  specialUnitId: Joi.string().optional(),

  officerId: Joi.string().required(),
  locationName: Joi.string().required(),
  projectName: Joi.string().required(),
  assignedUserId: Joi.string().required(),

  stageId: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required(),

  superStructure: Joi.array()
    .items(
      Joi.object({
        blockName: Joi.string().required(),

        // still keep for reference (optional or required as per your need)
        totalFloors: Joi.number().integer().min(1).required(),

        
        floors: Joi.array()
          .items(Joi.string().required())
          .min(1)
          .required()
      })
    )
    .optional()
})
.or("departmentId", "specialUnitId");

export const updateProjectSchema = Joi.object({

  districtId: Joi.string().optional(),

  departmentId: Joi.string().optional(),

  specialUnitId: Joi.string().optional(),

  officerId: Joi.string().optional(),

  locationName: Joi.string().optional(),

  projectName: Joi.string().optional(),

  assignedUserId: Joi.string().optional(),

  stageId: Joi.array()
    .items(Joi.string().required())
    .optional(),

  status: Joi.string()
    .valid(
      "AssignedProjects",
      "TotalProjects",
      "OngoingProjects",
      "CompletedProjects"
    )
    .optional(),

  superStructure: Joi.array()
    .items(
      Joi.object({

        blockName:
          Joi.string().required(),

        totalFloors:
          Joi.number()
            .integer()
            .min(1)
            .required(),

        floors: Joi.array()
          .items(
            Joi.string().required()
          )
          .min(1)
          .required()
      })
    )
    .optional()

})
.or("departmentId", "specialUnitId");

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

  // ✅ ADD THIS
  userId: Joi.string().uuid().optional()

})
.nand("departmentId", "specialUnitId")
.required();