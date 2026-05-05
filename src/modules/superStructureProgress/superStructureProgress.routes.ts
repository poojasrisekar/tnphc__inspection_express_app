import express from "express";
import { upload } from "../../utils/multer";

import {
  getSuperStructureFullViewController,
  createProgressController,
  createQualityController,
  deleteProgressController
} from "./superStructureProgress.controller";

const router = express.Router();

// 🔹 GET
router.get("/full/:projectId", getSuperStructureFullViewController);

// 🔹 PROGRESS
router.post(
  "/progress",
  upload.fields([{ name: "photo" }]),
  createProgressController
);

// 🔹 QUALITY
router.post(
  "/quality",
  upload.fields([
    { name: "cementPhoto" },
    { name: "sandPhoto" },
    { name: "steelPhoto" },
    { name: "aggregatePhoto" },
    { name: "waterPhoto" },
    { name: "concretePhoto" },
    { name: "concreteQualityPhoto" },
    { name: "bricksPhoto" },
    { name: "bricksQualityPhoto" }
  ]),
  createQualityController
);

// 🔹 DELETE
router.delete("/progress/:id", deleteProgressController);

export default router;