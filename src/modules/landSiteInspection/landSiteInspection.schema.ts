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

  isEncroachment: yesNo.required(),
  encroachmentPercent: requiredIfYes("isEncroachment", Joi.number()),
  encroachmentType: requiredIfYes("isEncroachment", Joi.string()),
  personEncroachingName: requiredIfYes("isEncroachment", Joi.string()),
  

  isCourtCase: yesNo.required(),
  caseDetails: requiredIfYes("isCourtCase", Joi.string()),

  hasStructure: yesNo.required(),
  structureDetails: requiredIfYes("hasStructure", Joi.string()),

  isLowLying: yesNo.required(),
  waterDepth: requiredIfYes("isLowLying", Joi.number()),
  waterDurationDays: requiredIfYes("isLowLying", Joi.number()),

  treesCount: Joi.number().required(),

  hasPowerLines: yesNo.required(),
  powerLineDetails: requiredIfYes("hasPowerLines", Joi.string()),

  isNearMonument: yesNo.required(),
  monumentName: requiredIfYes("isNearMonument", Joi.string()),
  monumentDistance: requiredIfYes("isNearMonument", Joi.number()),

  isNearSea: yesNo.required(),
  seaDistance: optionalIfYes("isNearSea", Joi.number()),

  isNearForest: yesNo.required(),
  forestName: requiredIfYes("isNearForest", Joi.string()),
  forestDistance: requiredIfYes("isNearForest", Joi.number()),

  isNearWaterBody: yesNo.required(),
  waterBodyName: requiredIfYes("isNearWaterBody", Joi.string()),
  waterBodyDistance: optionalIfYes("isNearWaterBody", Joi.number()),

  isNearBurial: yesNo.required(),
  burialName: requiredIfYes("isNearBurial", Joi.string()),
  burialDistance: requiredIfYes("isNearBurial", Joi.number()),

  roadType: Joi.string().required(),
  roadWidth: Joi.number().optional(),

  nearestService: Joi.string().required(),
  serviceDistance: Joi.number().required(),

  treesPhoto: Joi.any().optional(),
  // 🔥 ADD THESE ONLY (don’t change anything else)

encroachmentPhotos: Joi.any().optional(),
structurePhotos: Joi.any().optional(),
drainagePhotos: Joi.any().optional(),
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