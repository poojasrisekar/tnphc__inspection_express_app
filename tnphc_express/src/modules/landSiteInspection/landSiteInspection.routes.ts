import express from "express";
import {
  createInspection,
  getAllInspection,
  getInspectionById,
  updateInspection,
  deleteInspection
} from "./landSiteInspection.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createLandSiteInspectionSchema,
  updateLandSiteInspectionSchema,
  getLandSiteInspectionSchema,
  deleteLandSiteInspectionSchema,
  listLandSiteInspectionSchema,
  updateLandSiteInspectionParamsSchema
} from "./landSiteInspection.schema";
import { upload } from "../../utils/multer";

const router = express.Router();

router.post(
  "/createLandSiteInspection",
  upload.array("treesPhoto", 3),
  validateRequest(createLandSiteInspectionSchema),
  createInspection
);

// ✅ Get All (by projectId)
router.get(
  "/listLandSiteInspections",
  validateRequest(listLandSiteInspectionSchema, "query"),
  getAllInspection
);

// ✅ Get By ID
router.get(
  "/getLandSiteInspection/:id",
  validateRequest(getLandSiteInspectionSchema, "params"),
  getInspectionById
);

// ✅ Update
router.put(
  "/updateLandSiteInspection/:id",
  validateRequest(updateLandSiteInspectionParamsSchema, "params"),
  validateRequest(updateLandSiteInspectionSchema),
  updateInspection
);

// ✅ Delete (soft)
router.delete(
  "/deleteLandSiteInspection/:id",
  validateRequest(deleteLandSiteInspectionSchema, "params"),
  deleteInspection
);

export default router;