import { Router } from "express";
import * as controller from "./master.controller";
import { validateRequest } from "../../middleware/validateRequest";

import {
  masterSchema,
  updateMasterSchema,
  getMasterByIdSchema,
  updateMasterParamsSchema,
  listMastersSchema,
} from "./master.schema";

const router = Router();

router.post(
  "/createMaster",
  validateRequest(masterSchema),
  controller.createMaster
);

router.get(
  "/listMasters",
  validateRequest(listMastersSchema, "query"),
  controller.listMasters
);

router.get(
  "/getMasterById/:id",
  validateRequest(getMasterByIdSchema, "params"),
  controller.getMasterById
);

router.put(
  "/updateMaster/:id",
  validateRequest(updateMasterParamsSchema, "params"),
  validateRequest(updateMasterSchema),
  controller.updateMaster
);

router.delete(
  "/deleteMaster/:id",
  validateRequest(updateMasterParamsSchema, "params"),
  controller.deleteMaster
);

export default router;