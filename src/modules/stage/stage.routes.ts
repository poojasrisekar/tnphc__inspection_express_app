import express from "express";
import {
  createStageController,
  getAllStagesController,
  getStageByIdController,
  updateStageController,
  deleteStageController
} from "./stage.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  stageSchema,
  stageUpdateSchema,
  getStageSchema,
  getStageByIdSchema,
  deleteStageSchema,
  updateStageParamsSchema
} from "./stage.schema";

const router = express.Router();

// ✅ CREATE
router.post(
  "/createStage",
  validateRequest(stageSchema),
  createStageController
);

// ✅ GET ALL (with pagination + search)
router.get(
  "/getAllStages",
  validateRequest(getStageSchema),
  getAllStagesController
);

// ✅ GET BY ID
router.get(
  "/getStageById/:id",
  validateRequest(getStageByIdSchema),
  getStageByIdController
);

// ✅ UPDATE
router.put(
  "/updateStage/:id",
  validateRequest(updateStageParamsSchema),
  validateRequest(stageUpdateSchema),
  updateStageController
);

// ✅ DELETE (Soft Delete)
router.patch(
  "/deleteStage/:id",
  validateRequest(deleteStageSchema),
  deleteStageController
);

export default router;