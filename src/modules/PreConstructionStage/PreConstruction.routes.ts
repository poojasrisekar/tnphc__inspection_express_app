import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";

import {
  createPreConstruction,
  getAllPreConstruction,
  getPreConstructionById,
  updatePreConstruction
} from "./PreConstruction.controller";

import {
  createPreConstructionSchema,
  updatePreConstructionSchema
} from "./PreConstruction.schema";

const router = express.Router();

// Shared multer config
const photoUpload = upload.fields([
  { name: "waterSupplyPhotos", maxCount: 3 },
  { name: "toiletPhotos", maxCount: 3 },
  { name: "electricityPhotos", maxCount: 3 },
  { name: "labourPhotos", maxCount: 3 },
  { name: "materialPhotos", maxCount: 3 },
  { name: "accessRoadPhotos", maxCount: 3 }
]);

// CREATE
router.post(
  "/createPreConstruction",
  photoUpload,
  validateRequest(createPreConstructionSchema),
  createPreConstruction
);

// UPDATE
router.put(
  "/updatePreConstruction/:id",
  photoUpload,
  validateRequest(updatePreConstructionSchema),
  updatePreConstruction
);

// GET ALL
router.get(
  "/getAllPreConstruction",
  getAllPreConstruction
);

// GET BY PROJECT ID
router.get(
  "/getPreConstruction/:projectId",
  getPreConstructionById
);

export default router;