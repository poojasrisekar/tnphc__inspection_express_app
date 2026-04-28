import Joi from "joi";

export const createPreConstructionSchema = Joi.object({
  id:Joi.string().required(),
  projectId: Joi.string().required(),

  isPermissionObtained: Joi.string().valid("Yes", "No").required(),
  permissionDate: Joi.date().optional().allow(null),

  isSiteCleared: Joi.string().valid("Yes", "No").required(),
  siteDetails: Joi.string().allow("").optional(),

  hasLabourShed: Joi.string().valid("Yes", "No").required(),
  labourShedType: Joi.string().optional().allow(null),
  labourShedArea: Joi.number().optional().allow(null),

  hasWaterSupply: Joi.string().valid("Yes", "No").required(),
  hasToiletFacility: Joi.string().valid("Yes", "No").required(),
  hasElectricity: Joi.string().valid("Yes", "No").required(),

  labourCount: Joi.number().optional().allow(null),

  hasMaterialStorage: Joi.string().valid("Yes", "No").required(),
  materialType: Joi.string().optional().allow(null),

  hasTempElectricity: Joi.string().valid("Yes", "No").required(),
  waterType: Joi.string().optional().allow(null),

  isAccessRoadGood: Joi.string().valid("Yes", "No").required(),

  remarks: Joi.string().allow("").optional()
});