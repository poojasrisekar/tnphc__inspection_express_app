import Joi from "joi";

export const createPlinthStageSchema = Joi.object({
  projectId: Joi.string().required(),

  stageOfWork: Joi.string()
    .valid("PLINTH_BEAM", "BRICK_WORK", "EARTH_FILLING", "FLOOR_CONCRETING")
    .optional()
    .allow(null, ""),

  isCompleted: Joi.boolean().truthy("true").falsy("false").required(),

  // When isCompleted = false
  progressRemarks: Joi.string().optional().allow(null, ""),

  workStartedDate: Joi.date().optional().allow(null),

  isDelay: Joi.boolean().truthy("true").falsy("false").optional().allow(null),
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  // CEMENT
  cementGradeId: Joi.string().optional().allow(null, ""),
  cementBrandId: Joi.string().optional().allow(null, ""),
  cementRemarks: Joi.string().optional().allow(null, ""),
  cementLabTest: Joi.string().optional().allow(null, ""),

  // SAND
  sandType: Joi.string().valid("RIVER", "M_SAND").optional().allow(null, ""),
  sandLabTest: Joi.string().optional().allow(null, ""),
  sandSieveTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  sandSieveLabTest: Joi.string().optional().allow(null, ""),

  // STEEL
  steelGradeId: Joi.string().optional().allow(null, ""),
  steelBrandId: Joi.string().optional().allow(null, ""),
  steelLabTest: Joi.string().optional().allow(null, ""),

  // AGGREGATE
  aggregateSize: Joi.number().optional().allow(null),
  aggregateLabTest: Joi.string().optional().allow(null, ""),

  // WATER
  waterLabTest: Joi.string().optional().allow(null, ""),

  // CONCRETE
  concreteLabTest: Joi.string().optional().allow(null, ""),
  concreteQualityTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  concreteQualityLabTest: Joi.string().optional().allow(null, ""),

  // BRICKS
  bricksLabTest: Joi.string().optional().allow(null, ""),
  bricksQualityTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  bricksQualityLabTest: Joi.string().optional().allow(null, ""),

  qualityRemarks: Joi.string().optional().allow(null, "")
});

export const updatePlinthStageSchema = Joi.object({
  stageOfWork: Joi.string()
    .valid("PLINTH_BEAM", "BRICK_WORK", "EARTH_FILLING", "FLOOR_CONCRETING")
    .optional()
    .allow(null, ""),

  isCompleted: Joi.boolean().truthy("true").falsy("false").optional(),

  progressRemarks: Joi.string().optional().allow(null, ""),

  workStartedDate: Joi.date().optional().allow(null),

  isDelay: Joi.boolean().truthy("true").falsy("false").optional().allow(null),
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  cementGradeId: Joi.string().optional().allow(null, ""),
  cementBrandId: Joi.string().optional().allow(null, ""),
  cementRemarks: Joi.string().optional().allow(null, ""),
  cementLabTest: Joi.string().optional().allow(null, ""),

  sandType: Joi.string().valid("RIVER", "M_SAND").optional().allow(null, ""),
  sandLabTest: Joi.string().optional().allow(null, ""),
  sandSieveTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  sandSieveLabTest: Joi.string().optional().allow(null, ""),

  steelGradeId: Joi.string().optional().allow(null, ""),
  steelBrandId: Joi.string().optional().allow(null, ""),
  steelLabTest: Joi.string().optional().allow(null, ""),

  aggregateSize: Joi.number().optional().allow(null),
  aggregateLabTest: Joi.string().optional().allow(null, ""),

  waterLabTest: Joi.string().optional().allow(null, ""),

  concreteLabTest: Joi.string().optional().allow(null, ""),
  concreteQualityTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  concreteQualityLabTest: Joi.string().optional().allow(null, ""),

  bricksLabTest: Joi.string().optional().allow(null, ""),
  bricksQualityTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  bricksQualityLabTest: Joi.string().optional().allow(null, ""),

  qualityRemarks: Joi.string().optional().allow(null, "")
});