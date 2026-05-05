import express from "express";
import {
  getSuperStructureProgressViewController,
  createSuperStructureProgressController,
  updateSuperStructureProgressController
} from "./superStructureProgress.controller";

import { validateRequest } from "../../middleware/validateRequest";
import {
  createSuperStructureProgressSchema
} from "./superStructureProgress.schema";

import { upload } from "../../utils/multer";

const router = express.Router();

router.get(
  "/get/:projectId",
  getSuperStructureProgressViewController
);

router.post(
  "/create",
  upload.fields([
    { name: "superStructurePhoto" },
    { name: "cementPhoto" },
    { name: "sandPhoto" },
    { name: "steelPhoto" },
    { name: "aggregatePhoto" },
    { name: "waterPhoto" },
    { name: "concretePhoto" },
    { name: "bricksPhoto" }
  ]),
  validateRequest(createSuperStructureProgressSchema, "body"),
  createSuperStructureProgressController
);

router.put(
  "/update/:id",
  upload.fields([
    { name: "superStructurePhoto" },
    { name: "cementPhoto" },
    { name: "sandPhoto" },
    { name: "steelPhoto" }
  ]),
  updateSuperStructureProgressController
);

export default router;