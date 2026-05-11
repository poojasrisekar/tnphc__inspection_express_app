import { Router } from "express";

import * as controller from "./brand.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createBrandSchema,
  updateBrandSchema,
  brandIdSchema,
  listBrandSchema,
} from "./brand.schema";

const router = Router();

router.post(
  "/",
  validateRequest(createBrandSchema),
  controller.createBrand
);

router.get(
  "/",
  validateRequest(listBrandSchema, "query"),
  controller.listBrands
);

router.get(
  "/:id",
  validateRequest(brandIdSchema, "params"),
  controller.getBrandById
);

router.put(
  "/:id",
  validateRequest(brandIdSchema, "params"),
  validateRequest(updateBrandSchema),
  controller.updateBrand
);

router.delete(
  "/:id",
  validateRequest(brandIdSchema, "params"),
  controller.deleteBrand
);

export default router;