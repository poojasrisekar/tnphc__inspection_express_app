import express from "express";
import { upload } from "../../utils/multer";

import {
  getExteriorsFullViewController,
  createExteriorsProgressController,
  createExteriorsQualityController,
  getExteriorsProgressByProjectController,
  getExteriorsQualityByProjectController,
  deleteExteriorsProgressController
} from "./Exteriorsstage.controller";

const router = express.Router();

// 🔹 FULL VIEW
router.get(
  "/full/:projectId",
  getExteriorsFullViewController
);

// 🔹 PROGRESS
router.post(
  "/progress",
  upload.fields([
    { name: "progressPhoto", maxCount: 5 }
  ]),
  createExteriorsProgressController
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
  createExteriorsQualityController
);

// 🔹 GET
router.get(
  "/progress/:projectId",
  getExteriorsProgressByProjectController
);

router.get(
  "/quality/:projectId",
  getExteriorsQualityByProjectController
);

// 🔹 DELETE
router.delete(
  "/progress/:id",
  deleteExteriorsProgressController
);

export default router;