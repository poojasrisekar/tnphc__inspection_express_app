import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createDevelopmentWork,
  getAllDevelopmentWork,
  getDevelopmentWorkById,
  getDevelopmentWorkByProjectId,
  updateDevelopmentWork,
  deleteDevelopmentWork
} from "./DevelopmentWork.controller";
import {
  createDevelopmentWorkSchema,
  updateDevelopmentWorkSchema
} from "./DevelopmentWork.schema";

const router = express.Router();

const uploadFields = upload.fields([
  // SUMP & PUMP ROOM
  { name: "sumpCapacityPhotos",       maxCount: 5 },
  { name: "sumpQualityPhotos",        maxCount: 5 },
  { name: "pumpsSpecPhotos",          maxCount: 5 },
  { name: "standbyPumpsPhotos",       maxCount: 5 },
  { name: "pumpsWorkingPhotos",       maxCount: 5 },

  // BOREWELL
  { name: "borewellPhotos",           maxCount: 5 },
  { name: "borewellLabReport",        maxCount: 5 },

  // ROAD
  { name: "roadPhotos",               maxCount: 5 },

  // COMPOUND WALL
  { name: "compoundWallQualityPhotos",    maxCount: 5 },
  { name: "compoundWallExpansionPhotos",  maxCount: 5 },
  { name: "compoundWallAirVentsPhotos",   maxCount: 5 },

  // OTHER DEFECTS
  { name: "otherDefectsPhotos",       maxCount: 5 }
]);

router.post(
  "/",
  uploadFields,
  validateRequest(createDevelopmentWorkSchema),
  createDevelopmentWork
);

router.get("/getAllDevelopmentWork/:projectId", getAllDevelopmentWork);
router.get("/:id",           getDevelopmentWorkById);
router.get(
  "/:projectId",
  getDevelopmentWorkByProjectId
);

router.put(
  "/:id",
  uploadFields,
  validateRequest(updateDevelopmentWorkSchema),
  updateDevelopmentWork
);

router.delete("/:id", deleteDevelopmentWork);

export default router;