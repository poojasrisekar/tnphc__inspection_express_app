import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createFoundationProgress,
  getAllFoundationProgress,
  getFoundationProgressById,
  updateFoundationProgress,
  deleteFoundationProgress
} from "./FoundationProgress.controller";
import {
  createFoundationProgressSchema,
  updateFoundationProgressSchema
} from "./FoundationProgress.schema";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "photos", maxCount: 5 },
  { name: "delayPhotos", maxCount: 5 }
]);

router.post(
  "/createFoundationProgress",
  uploadFields,
  validateRequest(createFoundationProgressSchema),
  createFoundationProgress
);

router.get("/getAllFoundationProgress/:projectId", getAllFoundationProgress);

router.get("/getFoundationProgress/:id", getFoundationProgressById);

router.put(
  "/updateFoundationProgress/:id",
  uploadFields,
  validateRequest(updateFoundationProgressSchema),
  updateFoundationProgress
);

router.delete("/deleteFoundationProgress/:id", deleteFoundationProgress);

export default router;