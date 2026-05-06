import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  createInspection,
  getAllInspection,
  getInspectionById,
  updateInspection,
  deleteInspection,
} from "./landSiteInspection.controller";

import { validateRequest } from "../../middleware/validateRequest";
import { upload } from "../../utils/multer";

import {
  createLandSiteInspectionSchema,
  updateLandSiteInspectionSchema,
  getLandSiteInspectionSchema,
  deleteLandSiteInspectionSchema,
  listLandSiteInspectionSchema,
  updateLandSiteInspectionParamsSchema,
} from "./landSiteInspection.schema";

const router = express.Router();

// ✅ upload.any() — accepts files in ANY order, mixed with text fields
// Needed because the frontend sends photos inline between text fields
const inspectionUpload = upload.any();

// ✅ Multer error handler middleware
const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
    });
  }
  next(err);
};

// ✅ CREATE
router.post(
  "/createLandSiteInspection",
  inspectionUpload,
  handleMulterError,
  validateRequest(createLandSiteInspectionSchema),
  createInspection
);

// ✅ GET ALL
router.get(
  "/getLandSiteInspection",
  validateRequest(listLandSiteInspectionSchema, "query"),
  getAllInspection
);

// ✅ GET ONE
router.get(
  "/getLandSiteInspection/:id",
  validateRequest(getLandSiteInspectionSchema, "params"),
  getInspectionById
);

// ✅ UPDATE
router.put(
  "/land-site-inspections/:id",
  inspectionUpload,
  handleMulterError,
  validateRequest(updateLandSiteInspectionParamsSchema, "params"),
  validateRequest(updateLandSiteInspectionSchema),
  updateInspection
);

// ✅ DELETE
router.delete(
  "/land-site-inspections/:id",
  validateRequest(deleteLandSiteInspectionSchema, "params"),
  deleteInspection
);

export default router;