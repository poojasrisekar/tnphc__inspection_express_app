import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createFoundationQualityCheck,
  getAllFoundationQualityCheck,
  getFoundationQualityCheckById,
  updateFoundationQualityCheck,
  deleteFoundationQualityCheck,
   getFoundationCombinedByProject,
  getAllFoundationCombined
  
} from "./FoundationQualityCheck.controller";
import {
  createFoundationQualityCheckSchema,
  updateFoundationQualityCheckSchema
} from "./FoundationQualityCheck.schema";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "cementPhoto", maxCount: 3 },
  { name: "sandPhoto", maxCount: 3 },
  { name: "sandSievePhoto", maxCount: 3 },
  { name: "steelPhoto", maxCount: 3 },
  { name: "aggregatePhoto", maxCount: 3 },
  { name: "waterPhoto", maxCount: 3 },
  { name: "concretePhoto", maxCount: 3 },
  { name: "concreteQualityPhoto", maxCount: 3 },
  { name: "bricksPhoto", maxCount: 3 },
  { name: "bricksQualityPhoto", maxCount: 3 }
]);

router.post(
  "/createFoundationQualityCheck",
  uploadFields,
  validateRequest(createFoundationQualityCheckSchema),
  createFoundationQualityCheck
);

router.get(
  "/getAllFoundationQualityCheck/:projectId",
  getAllFoundationQualityCheck
);

router.get("/getFoundationQualityCheck/:id", getFoundationQualityCheckById);

router.put(
  "/updateFoundationQualityCheck/:id",
  uploadFields,
  validateRequest(updateFoundationQualityCheckSchema),
  updateFoundationQualityCheck
);

router.delete(
  "/deleteFoundationQualityCheck/:id",
  deleteFoundationQualityCheck
);


router.get(
  "/getFoundation/:projectId",
  getFoundationCombinedByProject
);

// ✔ For admin (all projects)
router.get(
  "/getAllFoundation",
  getAllFoundationCombined
);

export default router;