import Joi from "joi";

export const createExteriorsStageSchema = Joi.object({
  projectId: Joi.string().required(),

  block: Joi.string().optional().allow(null, ""),
  floor: Joi.string().optional().allow(null, ""),
  stageOfWork: Joi.string().optional().allow(null, ""),

  isCompleted: Joi.boolean().truthy("true").falsy("false").required(),

  progressRemarks: Joi.string().optional().allow(null, ""),

  workStartedDate: Joi.date().optional().allow(null),

  isDelayed: Joi.boolean().truthy("true").falsy("false").optional().allow(null),
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOther: Joi.string().optional().allow(null, ""),

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

  // PLASTERING
  plasteringTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  plasteringLabTest: Joi.string().optional().allow(null, ""),
  plasteringRemarks: Joi.string().optional().allow(null, ""),

  // DOORS & WINDOWS
  doorWindowType: Joi.string().optional().allow(null, ""),
  upvcBrand: Joi.string().optional().allow(null, ""),
  glassBrand: Joi.string().optional().allow(null, ""),
  glassThickness: Joi.string().optional().allow(null, ""),
  doorWindowRemarks: Joi.string().optional().allow(null, ""),

  // INTERIOR TILES
  interiorFloorType: Joi.string().optional().allow(null, ""),
  interiorTileBrand: Joi.string().optional().allow(null, ""),
  interiorTileRemarks: Joi.string().optional().allow(null, ""),

  // EXTERIOR ROOF TILES
  roofFloorType: Joi.string().optional().allow(null, ""),
  roofTileBrand: Joi.string().optional().allow(null, ""),
  roofTileRemarks: Joi.string().optional().allow(null, ""),

  // INTERIOR PAINTING
  interiorPaintBrand: Joi.string().optional().allow(null, ""),
  interiorPaintingQuality: Joi.string().optional().allow(null, ""),

  // EXTERIOR PAINTING
  exteriorPaintBrand: Joi.string().optional().allow(null, ""),
  exteriorPaintingQuality: Joi.string().optional().allow(null, ""),

  qualityRemarks: Joi.string().optional().allow(null, "")
});

export const updateExteriorsStageSchema = Joi.object({
  block: Joi.string().optional().allow(null, ""),
  floor: Joi.string().optional().allow(null, ""),
  stageOfWork: Joi.string().optional().allow(null, ""),

  isCompleted: Joi.boolean().truthy("true").falsy("false").optional(),

  progressRemarks: Joi.string().optional().allow(null, ""),

  workStartedDate: Joi.date().optional().allow(null),

  isDelayed: Joi.boolean().truthy("true").falsy("false").optional().allow(null),
  delayDays: Joi.number().integer().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOther: Joi.string().optional().allow(null, ""),

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

  plasteringTestDone: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .allow(null),
  plasteringLabTest: Joi.string().optional().allow(null, ""),
  plasteringRemarks: Joi.string().optional().allow(null, ""),

  doorWindowType: Joi.string().optional().allow(null, ""),
  upvcBrand: Joi.string().optional().allow(null, ""),
  glassBrand: Joi.string().optional().allow(null, ""),
  glassThickness: Joi.string().optional().allow(null, ""),
  doorWindowRemarks: Joi.string().optional().allow(null, ""),

  interiorFloorType: Joi.string().optional().allow(null, ""),
  interiorTileBrand: Joi.string().optional().allow(null, ""),
  interiorTileRemarks: Joi.string().optional().allow(null, ""),

  roofFloorType: Joi.string().optional().allow(null, ""),
  roofTileBrand: Joi.string().optional().allow(null, ""),
  roofTileRemarks: Joi.string().optional().allow(null, ""),

  interiorPaintBrand: Joi.string().optional().allow(null, ""),
  interiorPaintingQuality: Joi.string().optional().allow(null, ""),

  exteriorPaintBrand: Joi.string().optional().allow(null, ""),
  exteriorPaintingQuality: Joi.string().optional().allow(null, ""),

  qualityRemarks: Joi.string().optional().allow(null, "")
});