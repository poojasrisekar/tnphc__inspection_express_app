import e from "express";
import Joi from "joi";

// ✅ Reusable enum

export const createLandSiteInspectionSchema = Joi.object({

  projectId: Joi.string().required(),

  // 🔹 Encroachment
  isEncroachment: Joi.string().valid("Yes", "No").required(),
  encroachmentPercent: Joi.number().required(),
  encroachmentType: Joi.string().required(),

  // 🔹 Court Cases
  isCourtCase:  Joi.string().valid("Yes", "No").required(),
  caseDetails: Joi.string().required(),

  // 🔹 Existing Structure
  hasStructure: Joi.string().valid("Yes", "No").required(),
  structureDetails:Joi.string().required(),

  // 🔹 Drainage
  isLowLying: Joi.string().valid("Yes", "No").required(),
  waterDepth: Joi.number().required(),
  waterDurationDays: Joi.number().integer().required(),

  // 🔹 Trees
  treesCount: Joi.number().integer().min(0).optional(),
 treesPhoto: Joi.any().optional(),

  // 🔹 Power Lines
  hasPowerLines:  Joi.string().valid("Yes", "No").required(),
  powerLineDetails:Joi.string().required(),

  // 🔹 Restricted Zones
  isNearMonument: Joi.string().valid("Yes", "No").required(),
  monumentName:Joi.string().required(),
  monumentDistance: Joi.number().required(),

  isNearSea: Joi.string().valid("Yes", "No").required(),
  seaDistance: Joi.number().required(),

  isNearForest: Joi.string().valid("Yes", "No").required(),
  forestName: Joi.string().required(),
  forestDistance: Joi.number().required(),

  isNearWaterBody:Joi.string().valid("Yes", "No").required(),
  waterBodyName: Joi.string().required(),
  waterBodyDistance: Joi.number().required(),

  // 🔹 Burial Ground
  isNearBurial: Joi.string().valid("Yes", "No").required(),
  burialName: Joi.string().required(),
  burialDistance: Joi.number().required(),

  // 🔹 Roads
  roadType: Joi.string().optional(),
  roadWidth: Joi.number().optional(),

  // 🔹 Essential Services
  nearestService: Joi.string().optional(),
  serviceDistance: Joi.number().optional(),

});

export const updateLandSiteInspectionSchema = Joi.object({

  projectId: Joi.string().required(),

  // 🔹 Encroachment
  isEncroachment: Joi.string().valid("Yes", "No").required(),
  encroachmentPercent: Joi.number().required(),
  encroachmentType: Joi.string().required(),

  // 🔹 Court Cases
  isCourtCase:  Joi.string().valid("Yes", "No").required(),
  caseDetails: Joi.string().required(),

  // 🔹 Existing Structure
  hasStructure: Joi.string().valid("Yes", "No").required(),
  structureDetails:Joi.string().required(),

  // 🔹 Drainage
  isLowLying: Joi.string().valid("Yes", "No").required(),
  waterDepth: Joi.number().required(),
  waterDurationDays: Joi.number().integer().required(),

  // 🔹 Trees
  treesCount: Joi.number().integer().min(0).optional(),
  treesPhoto: Joi.array()
    .items(Joi.string())
    .max(3) // ✅ max 3 images
    .optional(),

  // 🔹 Power Lines
  hasPowerLines:  Joi.string().valid("Yes", "No").required(),
  powerLineDetails:Joi.string().required(),

  // 🔹 Restricted Zones
  isNearMonument: Joi.string().valid("Yes", "No").required(),
  monumentName:Joi.string().required(),
  monumentDistance: Joi.number().required(),

  isNearSea: Joi.string().valid("Yes", "No").required(),
  seaDistance: Joi.number().required(),

  isNearForest: Joi.string().valid("Yes", "No").required(),
  forestName: Joi.string().required(),
  forestDistance: Joi.number().required(),

  isNearWaterBody:Joi.string().valid("Yes", "No").required(),
  waterBodyName: Joi.string().required(),
  waterBodyDistance: Joi.number().required(),

  // 🔹 Burial Ground
  isNearBurial: Joi.string().valid("Yes", "No").required(),
  burialName: Joi.string().required(),
  burialDistance: Joi.number().required(),

  // 🔹 Roads
  roadType: Joi.string().optional(),
  roadWidth: Joi.number().optional(),

  // 🔹 Essential Services
  nearestService: Joi.string().optional(),
  serviceDistance: Joi.number().optional(),

});

export const getLandSiteInspectionSchema = Joi.object({
  id: Joi.string().required()
});

export const deleteLandSiteInspectionSchema = Joi.object({
  id: Joi.string().required()
});

export const listLandSiteInspectionSchema = Joi.object({
  projectId: Joi.string().required()
});
 export const updateLandSiteInspectionParamsSchema = Joi.object({
  id: Joi.string().required(),
});