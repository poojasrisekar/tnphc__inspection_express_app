import { Router } from "express";
import * as controller from "./material.controller";
import { validateRequest } from "../../middleware/validateRequest";

import {
  materialSchema,
  updateMaterialSchema,
  getMaterialById,
  updateMaterialParamsSchema,
  listMaterialsSchema,
} from "./material.schema";

const router = Router();

router.post(
  "/createMaterial",
  validateRequest(materialSchema),
  controller.createMaterial
);

router.get(
  "/listMaterials",
  validateRequest(listMaterialsSchema, "query"),
  controller.listMaterials
);

router.get(
  "/getMaterialById/:id",
  validateRequest(getMaterialById, "params"),
  controller.getMaterialById
);

router.put(
  "/updateMaterial/:id",
  validateRequest(updateMaterialParamsSchema, "params"),
  validateRequest(updateMaterialSchema),
  controller.updateMaterial
);

router.delete(
  "/deleteMaterial/:id",
  validateRequest(updateMaterialParamsSchema, "params"),
  controller.deleteMaterial
);

export default router;