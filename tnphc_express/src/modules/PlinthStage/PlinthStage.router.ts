import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createPlinthStage,
  getAllPlinthStage,
  getPlinthStageById,
  updatePlinthStage,
  deletePlinthStage
} from "./PlinthStage.controller";
import {
  createPlinthStageSchema,
  updatePlinthStageSchema
} from "./PlinthStage.schema";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "progressPhoto", maxCount: 5 },
  { name: "cementPhoto", maxCount: 3 },
  { name: "sandPhoto", maxCount: 3 },
  { name: "sandSievePhoto", maxCount: 3 },
  { name: "steelPhoto", maxCount: 3 },
  { name: "aggregatePhoto", maxCount: 3 },
  { name: "waterPhoto", maxCount: 3 },
  { name: "concretePhoto", maxCount: 3 },
  { name: "concreteQualityPhoto", maxCount: 3 },
  { name: "bricksPhoto", maxCount: 3 },
  { name: "bricksQualityPhoto", maxCount: 3 }
]);

router.post(
  "/createPlinthStage",
  uploadFields,
  validateRequest(createPlinthStageSchema),
  createPlinthStage
);

router.get("/getAllPlinthStage/:projectId", getAllPlinthStage);
router.get("/getPlinthStage/:id", getPlinthStageById);

router.put(
  "/updatePlinthStage/:id",
  uploadFields,
  validateRequest(updatePlinthStageSchema),
  updatePlinthStage
);

router.delete("/deletePlinthStage/:id", deletePlinthStage);

export default router;