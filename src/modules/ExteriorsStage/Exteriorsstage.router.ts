import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createExteriorsStage,
  getAllExteriorsStage,
  getExteriorsStageById,
  updateExteriorsStage,
  deleteExteriorsStage
} from "./Exteriorsstage.controller";
import {
  createExteriorsStageSchema,
  updateExteriorsStageSchema
} from "./Exteriorsstage.schema";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "progressPhoto", maxCount: 5 },
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
]);

router.post(
  "/createExteriorsStage",
  uploadFields,
  validateRequest(createExteriorsStageSchema),
  createExteriorsStage
);

router.get("/getAllExteriorsStage/:projectId", getAllExteriorsStage);
router.get(
  "/getExteriorsStage/:projectId",
  getExteriorsStageById
);

router.put(
  "/updateExteriorsStage/:id",
  uploadFields,
  validateRequest(updateExteriorsStageSchema),
  updateExteriorsStage
);

router.delete("/deleteExteriorsStage/:id", deleteExteriorsStage);

export default router;