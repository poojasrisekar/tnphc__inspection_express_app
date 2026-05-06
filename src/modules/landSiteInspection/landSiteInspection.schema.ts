import Joi from "joi";

const yesNo = Joi.string().valid("Yes", "No");

// 🔹 helpers
const requiredIfYes = (field: string, schema: Joi.Schema) =>
  Joi.when(field, {
    is: "Yes",
    then: schema.required(),
    otherwise: Joi.forbidden(),
  });

const optionalIfYes = (field: string, schema: Joi.Schema) =>
  Joi.when(field, {
    is: "Yes",
    then: schema.optional(),
    otherwise: Joi.forbidden(),
  });

export const createLandSiteInspectionSchema = Joi.object({
  projectId: Joi.string().required(),

  // 🔹 Encroachment
  isEncroachment: yesNo.required(),
  encroachmentPercent: requiredIfYes("isEncroachment", Joi.number()),
  encroachmentType: requiredIfYes("isEncroachment", Joi.string()),
  personEncroachingName: requiredIfYes("isEncroachment", Joi.string()),

  // 🔹 Court Case
  isCourtCase: yesNo.required(),
  caseDetails: requiredIfYes("isCourtCase", Joi.string()),

  // 🔹 Structure
  hasStructure: yesNo.required(),
  structureDetails: requiredIfYes("hasStructure", Joi.string()),

  // 🔹 Low Lying
  isLowLying: yesNo.required(),
  waterDepth: requiredIfYes("isLowLying", Joi.number()),
  waterDurationDays: requiredIfYes("isLowLying", Joi.number()),

  // 🔹 Trees
  treesCount: Joi.number().required(),

  // 🔹 Power Lines
  hasPowerLines: yesNo.required(),
  powerLineDetails: requiredIfYes("hasPowerLines", Joi.string()),

  // 🔹 Monument
  isNearMonument: yesNo.required(),
  monumentName: requiredIfYes("isNearMonument", Joi.string()),
  monumentDistance: requiredIfYes("isNearMonument", Joi.number()),

  // 🔹 Sea
  isNearSea: yesNo.required(),
  seaDistance: optionalIfYes("isNearSea", Joi.number()),

  // 🔹 Forest
  isNearForest: yesNo.required(),
  forestName: requiredIfYes("isNearForest", Joi.string()),
  forestDistance: requiredIfYes("isNearForest", Joi.number()),

  // 🔹 Water Body
  isNearWaterBody: yesNo.required(),
  waterBodyName: requiredIfYes("isNearWaterBody", Joi.string()),
  waterBodyDistance: optionalIfYes("isNearWaterBody", Joi.number()),

  // 🔹 Burial
  isNearBurial: yesNo.required(),
  burialName: requiredIfYes("isNearBurial", Joi.string()),
  burialDistance: requiredIfYes("isNearBurial", Joi.number()),

  // 🔹 Road
  roadType: Joi.string().required(),
  roadWidth: Joi.number().optional(),

  // 🔹 Services
  nearestService: Joi.string().required(),
  serviceDistance: Joi.number().required(),

  // 🔹 Photos (all optional, handled by multer)
  encroachmentPhotos: Joi.any().optional(),
  structurePhotos: Joi.any().optional(),
  drainagePhotos: Joi.any().optional(),
  treesPhoto: Joi.any().optional(),
  powerLinePhotos: Joi.any().optional(),
  monumentPhotos: Joi.any().optional(),
  seaPhotos: Joi.any().optional(),
  forestPhotos: Joi.any().optional(),
  waterBodyPhotos: Joi.any().optional(),
  burialPhotos: Joi.any().optional(),
});

export const updateLandSiteInspectionSchema = createLandSiteInspectionSchema;

export const getLandSiteInspectionSchema = Joi.object({
  id: Joi.string().required(),
});

export const deleteLandSiteInspectionSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateLandSiteInspectionParamsSchema = Joi.object({
  id: Joi.string().required(),
});

export const listLandSiteInspectionSchema = Joi.object({
  projectId: Joi.string().required(),
});