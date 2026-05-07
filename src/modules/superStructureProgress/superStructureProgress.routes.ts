import express from "express";
import { upload } from "../../utils/multer";

import {
  getSuperStructureFullViewController,
  createProgressController,
  createQualityController,
  getProgressByProjectController,
getQualityByProjectController,
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

router.post(
  "/quality",
  upload.fields([
    { name: "cementPhoto" },
    { name: "sandPhoto" },
    { name: "sandSievePhoto" },
    { name: "steelPhoto" },
    { name: "aggregatePhoto" },
    { name: "waterPhoto" },
    { name: "concretePhoto" },
    { name: "concreteQualityPhoto" },
    { name: "bricksPhoto" },
    { name: "bricksQualityPhoto" },
    { name: "brickWallAlignmentPhoto" }
  ]),
  createQualityController
);

router.get(
  "/progress/:projectId",
  getProgressByProjectController
);

router.get(
  "/quality/:projectId",
  getQualityByProjectController
);;

// 🔹 DELETE
router.delete("/progress/:id", deleteProgressController);

export default router;