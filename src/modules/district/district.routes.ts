import express from "express";
import {
  createDistrictController,
  getAllDistrictsController,
  getDistrictByIdController,
  updateDistrictController,
  deleteDistrictController,
} from "./district.controller";

import { validateRequest } from "../../middleware/validateRequest";
import {
  createDistrictSchema,
  updateDistrictSchema,
  getAllDistrictsSchema,
  getDistrictByIdSchema,
  deleteDistrictSchema,
  updateDistrictParamsSchema,
} from "./district.schema";

const router = express.Router();

router.post(
  "/createDistrict",
  validateRequest(createDistrictSchema, "body"),
  createDistrictController
);

router.get(
  "/getAllDistricts",
  validateRequest(getAllDistrictsSchema, "query"),
  getAllDistrictsController
);

router.get(
  "/getDistrictById/:id",
  validateRequest(getDistrictByIdSchema, "params"),
  getDistrictByIdController
);

router.put(
  "/updateDistrict/:id",
  validateRequest(updateDistrictParamsSchema, "params"),
  validateRequest(updateDistrictSchema, "body"),
  updateDistrictController
);

router.patch(
  "/deleteDistrict/:id",
  validateRequest(deleteDistrictSchema, "params"),
  deleteDistrictController
);

export default router;