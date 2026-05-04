import express from "express";
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


router.post(
  "/createLandSiteInspection",
  upload.array("treesPhoto", 3),
  validateRequest(createLandSiteInspectionSchema),
  createInspection
);


router.get(
  "/land-site-inspections",
  validateRequest(listLandSiteInspectionSchema, "query"),
  getAllInspection
);

router.get(
  "/land-site-inspections/:id",
  validateRequest(getLandSiteInspectionSchema, "params"),
  getInspectionById
);


router.put(
  "/land-site-inspections/:id",
  upload.array("treesPhoto", 3),
  validateRequest(updateLandSiteInspectionParamsSchema, "params"),
  validateRequest(updateLandSiteInspectionSchema),
  updateInspection
);


router.delete(
  "/land-site-inspections/:id",
  validateRequest(deleteLandSiteInspectionSchema, "params"),
  deleteInspection
);

export default router;