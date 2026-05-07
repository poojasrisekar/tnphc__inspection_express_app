import express from "express";
import { upload } from "../../utils/multer";

import {
  getInteriorsFullViewController,
  createInteriorsProgressController,
  createInteriorsQualityController,
  getInteriorsProgressByProjectController,
  getInteriorsQualityByProjectController,
  deleteInteriorsProgressController
} from "./InteriorsStage.controller";

const router = express.Router();

// 🔹 GET FULL VIEW
router.get(
  "/full/:projectId",
  getInteriorsFullViewController
);

// 🔹 PROGRESS
router.post(
  "/progress",
  upload.fields([
    { name: "progressPhoto", maxCount: 5 }
  ]),
  createInteriorsProgressController
);

// 🔹 QUALITY
router.post(
  "/quality",
  upload.fields([
    { name: "cementPhoto", maxCount: 3 },
    { name: "sandPhoto", maxCount: 3 },
    { name: "sandSievePhoto", maxCount: 3 },
    { name: "aggregatePhoto", maxCount: 3 },
    { name: "waterPhoto", maxCount: 3 },
    { name: "concretePhoto", maxCount: 3 },
    { name: "concreteQualityPhoto", maxCount: 3 },
    { name: "bricksPhoto", maxCount: 3 },
    { name: "bricksQualityPhoto", maxCount: 3 },
    { name: "plasteringPhoto", maxCount: 3 }
  ]),
  createInteriorsQualityController
);

// 🔹 GET PROGRESS
router.get(
  "/progress/:projectId",
  getInteriorsProgressByProjectController
);

// 🔹 GET QUALITY
router.get(
  "/quality/:projectId",
  getInteriorsQualityByProjectController
);

// 🔹 DELETE
router.delete(
  "/progress/:id",
  deleteInteriorsProgressController
);

export default router;