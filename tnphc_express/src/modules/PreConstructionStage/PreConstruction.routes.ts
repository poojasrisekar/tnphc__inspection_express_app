import express from "express";
import { upload } from "../../utils/multer";
import { validateRequest } from "../../middleware/validateRequest";
import { createPreConstruction } from "./PreConstruction.controller";
import { createPreConstructionSchema } from "./PreConstruction.schema";

const router = express.Router();

router.post(
  "/createPreConstruction",
  // upload.fields([
  //   { name: "waterSupplyPhotos", maxCount: 3 },
  //   { name: "toiletPhotos", maxCount: 3 },
  //   { name: "electricityPhotos", maxCount: 3 },x 
  //   { name: "labourPhotos", maxCount: 3 },
  //   { name: "materialPhotos", maxCount: 3 },
  //   { name: "accessRoadPhotos", maxCount: 3 }
  // ]),
  validateRequest(createPreConstructionSchema),
  createPreConstruction
);

router.get("/test", (req, res) => {
  console.log("req.user",req.user)
  console.log("working")
  // res.send("Server working ✅");
   res.status(201).json({
      success: true,
      message: "Created",
      data: "result"
    });
});

export default router;