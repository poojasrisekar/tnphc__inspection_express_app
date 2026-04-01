// routes/specialUnit.routes.ts

import express from "express";
import {
  createSpecialUnitController,
  getAllSpecialUnitsController,
  getSpecialUnitByIdController,
  updateSpecialUnitController,
  deleteSpecialUnitController
} from "./specialUnits.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createSpecialUnitSchema,
  updateSpecialUnitSchema,
  getSpecialUnitByIdSchema,
  deleteSpecialUnitSchema,
  getAllSpecialUnitsSchema,
  updateParamsSchema
} from "./specialUnits.schema";

const router = express.Router();

router.post(
  "/createSpecialUnit",
  validateRequest(createSpecialUnitSchema),
  createSpecialUnitController
);

router.get(
  "/getAllSpecialUnits",
  validateRequest(getAllSpecialUnitsSchema),
  getAllSpecialUnitsController
);

router.get(
  "/getSpecialUnitById/:id",
  validateRequest(getSpecialUnitByIdSchema),
  getSpecialUnitByIdController
);

router.put(
  "/updateSpecialUnit/:id",
  validateRequest(updateParamsSchema),
  validateRequest(updateSpecialUnitSchema),
  updateSpecialUnitController
);

router.patch(
  "/deleteSpecialUnit/:id",
  validateRequest(deleteSpecialUnitSchema),
  deleteSpecialUnitController
);

export default router;