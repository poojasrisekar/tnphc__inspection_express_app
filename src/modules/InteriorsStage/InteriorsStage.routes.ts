import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createInteriorsStage,
  getAllInteriorsStage,
  getInteriorsStageById,
  updateInteriorsStage,
  deleteInteriorsStage
} from "./InteriorsStage.controller";
import {
  createInteriorsStageSchema,
  updateInteriorsStageSchema
} from "./InteriorsStage.schema";

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
  "/createInteriorsStage",
  uploadFields,
  validateRequest(createInteriorsStageSchema),
  createInteriorsStage
);

router.get("/getAllInteriorsStage/:projectId", getAllInteriorsStage);
router.get("/getInteriorsStage/:id", getInteriorsStageById);

router.put(
  "/updateInteriorsStage/:id",
  uploadFields,
  validateRequest(updateInteriorsStageSchema),
  updateInteriorsStage
);

router.delete("/deleteInteriorsStage/:id", deleteInteriorsStage);

export default router;