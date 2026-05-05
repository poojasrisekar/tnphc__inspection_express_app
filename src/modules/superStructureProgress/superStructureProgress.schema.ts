import Joi from "joi";


const booleanField = Joi.boolean()
  .truthy("true")
  .falsy("false")
  .optional()
  .allow(null);


export const createSuperStructureProgressSchema = Joi.object({
  projectId: Joi.string().uuid().required(),

  blockName: Joi.string().required(),

  currentFloor: Joi.number().integer().min(0).optional(),

  status: Joi.string()
    .valid("NOT_STARTED", "IN_PROGRESS", "COMPLETED")
    .optional(),

  floorsProgress: Joi.any().optional(),

  workStartedDate: Joi.date().optional().allow(null),

  isDelay: booleanField,
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  
  cementGradeId: Joi.string().optional().allow(null, ""),
  cementBrandId: Joi.string().optional().allow(null, ""),
  cementRemarks: Joi.string().optional().allow(null, ""),
  cementLabTest: Joi.string().optional().allow(null, ""),
  cementPhoto: Joi.any().optional(),

  
  sandType: Joi.string()
    .valid("RIVER", "M_SAND")
    .optional()
    .allow(null, ""),

  sandLabTest: Joi.string().optional().allow(null, ""),
  sandPhoto: Joi.any().optional(),

  sandSieveTestDone: booleanField,
  sandSieveLabTest: Joi.string().optional().allow(null, ""),
  sandSievePhoto: Joi.any().optional(),

  
  steelGradeId: Joi.string().optional().allow(null, ""),
  steelBrandId: Joi.string().optional().allow(null, ""),
  steelLabTest: Joi.string().optional().allow(null, ""),
  steelPhoto: Joi.any().optional(),

 
  aggregateSize: Joi.number().optional().allow(null),
  aggregateLabTest: Joi.string().optional().allow(null, ""),
  aggregatePhoto: Joi.any().optional(),

  
  waterLabTest: Joi.string().optional().allow(null, ""),
  waterPhoto: Joi.any().optional(),

  
  concreteLabTest: Joi.string().optional().allow(null, ""),
  concretePhoto: Joi.any().optional(),

  concreteQualityTestDone: booleanField,
  concreteQualityLabTest: Joi.string().optional().allow(null, ""),
  concreteQualityPhoto: Joi.any().optional(),

  
  bricksLabTest: Joi.string().optional().allow(null, ""),
  bricksPhoto: Joi.any().optional(),

  bricksQualityTestDone: booleanField,
  bricksQualityLabTest: Joi.string().optional().allow(null, ""),
  bricksQualityPhoto: Joi.any().optional(),

 
  qualityRemarks: Joi.string().optional().allow(null, "")
});



export const updateSuperStructureProgressSchema = Joi.object({
  currentFloor: Joi.number().integer().min(0).optional(),

  status: Joi.string()
    .valid("NOT_STARTED", "IN_PROGRESS", "COMPLETED")
    .optional(),

  superStructurePhoto: Joi.any().optional(),

  workStartedDate: Joi.date().optional().allow(null),

  isDelay: booleanField,
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  
  cementGradeId: Joi.string().optional().allow(null, ""),
  cementBrandId: Joi.string().optional().allow(null, ""),
  cementRemarks: Joi.string().optional().allow(null, ""),
  cementLabTest: Joi.string().optional().allow(null, ""),
  cementPhoto: Joi.any().optional(),

  
  sandType: Joi.string().valid("RIVER", "M_SAND").optional().allow(null, ""),
  sandLabTest: Joi.string().optional().allow(null, ""),
  sandPhoto: Joi.any().optional(),

  sandSieveTestDone: booleanField,
  sandSieveLabTest: Joi.string().optional().allow(null, ""),
  sandSievePhoto: Joi.any().optional(),

  
  steelGradeId: Joi.string().optional().allow(null, ""),
  steelBrandId: Joi.string().optional().allow(null, ""),
  steelLabTest: Joi.string().optional().allow(null, ""),
  steelPhoto: Joi.any().optional(),

  
  aggregateSize: Joi.number().optional().allow(null),
  aggregateLabTest: Joi.string().optional().allow(null, ""),
  aggregatePhoto: Joi.any().optional(),

  
  waterLabTest: Joi.string().optional().allow(null, ""),
  waterPhoto: Joi.any().optional(),

  
  concreteLabTest: Joi.string().optional().allow(null, ""),
  concretePhoto: Joi.any().optional(),

  concreteQualityTestDone: booleanField,
  concreteQualityLabTest: Joi.string().optional().allow(null, ""),
  concreteQualityPhoto: Joi.any().optional(),

  
  bricksLabTest: Joi.string().optional().allow(null, ""),
  bricksPhoto: Joi.any().optional(),

  bricksQualityTestDone: booleanField,
  bricksQualityLabTest: Joi.string().optional().allow(null, ""),
  bricksQualityPhoto: Joi.any().optional(),

  
  qualityRemarks: Joi.string().optional().allow(null, "")
});



export const getSuperStructureProgressSchema = Joi.object({
  projectId: Joi.string().uuid().required()
});