import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import { createPreConstruction,
   getAllPreConstruction,
  getPreConstructionById
 } from "./PreConstruction.controller";
import { createPreConstructionSchema } from "./PreConstruction.schema";

const router = express.Router();

router.post(
  "/createPreConstruction",
  upload.fields([
    { name: "waterSupplyPhotos", maxCount: 3 },
    { name: "toiletPhotos", maxCount: 3 },
    { name: "electricityPhotos", maxCount: 3 },
    { name: "labourPhotos", maxCount: 3 },
    { name: "materialPhotos", maxCount: 3 },
    { name: "accessRoadPhotos", maxCount: 3 }
  ]),
  validateRequest(createPreConstructionSchema),
  createPreConstruction
);


// GET ALL (with projectId)
router.get("/getAllPreConstruction", getAllPreConstruction);

// GET BY ID
router.get("/getPreConstructionById/:id", getPreConstructionById);


export default router;