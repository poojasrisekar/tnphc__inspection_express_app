import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createBuildingInspection,
  getAllBuildingInspection,
  getBuildingInspectionByProjectId,
  
  updateBuildingInspection,
  deleteBuildingInspection
} from "./BuildingInspection.controller";
import {
  createBuildingInspectionSchema,
  updateBuildingInspectionSchema
} from "./BuildingInspection.schema";

const router = express.Router();

const uploadFields = upload.fields([
  // STRUCTURE
  { name: "structureAlignmentPhoto",     maxCount: 5 },
  { name: "structureConcreteCubeReport", maxCount: 5 },
  { name: "structureCementReport",       maxCount: 5 },
  { name: "structureSteelReport",        maxCount: 5 },
  { name: "structureWaterReport",        maxCount: 5 },
  { name: "structureSandReport",         maxCount: 5 },
  { name: "structureAggregateReport",    maxCount: 5 },
  { name: "structureBricksReport",       maxCount: 5 },

  // PAINTING
  { name: "paintingDefectPhoto",         maxCount: 5 },

  // TILING & FLOORING
  { name: "tilingDefectPhoto",           maxCount: 5 },

  // FALSE CEILING
  { name: "falseCeilingDefectPhoto",     maxCount: 5 },

  // PLUMBING
  { name: "plumbingWaterSupplyPhoto",    maxCount: 5 },
  { name: "plumbingLeakagePhoto",        maxCount: 5 },

  // ELECTRICAL
  { name: "electricalSwitchPhoto",       maxCount: 5 },
  { name: "electricalPowerPhoto",        maxCount: 5 },
  { name: "electricalVoltagePhoto",      maxCount: 5 },
  { name: "electricalEarthingPhoto",     maxCount: 5 },
  { name: "electricalELCBPhoto",         maxCount: 5 },

  // DOORS & WINDOWS
  { name: "dwQualityPhoto",              maxCount: 5 },
  { name: "dwOperationPhoto",            maxCount: 5 },

  // LIFTS
  { name: "liftWorkingPhoto",            maxCount: 5 },
  { name: "liftSafetyPhoto",             maxCount: 5 },

  // TERRACE
  { name: "terraceRoofTilesPhoto",       maxCount: 5 },
  { name: "terraceDrainagePhoto",        maxCount: 5 },
  { name: "terraceWaterproofingReport",  maxCount: 5 },
  { name: "terraceLeakagePhoto",         maxCount: 5 },
  { name: "terraceLeakageResultPhoto",   maxCount: 5 }
]);

router.post(
  "/createBuildingInspection",
  uploadFields,
  validateRequest(createBuildingInspectionSchema),
  createBuildingInspection
);

router.get("/getAllBuildingInspection/:projectId", getAllBuildingInspection);
router.get(
  "/getBuildingInspection/:projectId",
  getBuildingInspectionByProjectId
);

router.put(
  "/updateBuildingInspection/:id",
  uploadFields,
  validateRequest(updateBuildingInspectionSchema),
  updateBuildingInspection
);

router.delete("/deleteBuildingInspection/:id", deleteBuildingInspection);

export default router;