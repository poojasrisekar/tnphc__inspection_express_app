import { Router } from "express";
import * as controller from "./brand.controller";
import { validateRequest } from "../../middleware/validateRequest";

import {
  brandSchema,
  updateBrandSchema,
  getBrandByIdSchema,
  updateBrandParamsSchema,
  listBrandsSchema,
} from "./brand.schema";

const router = Router();

router.post(
  "/createBrand",
  validateRequest(brandSchema),
  controller.createBrand
);

router.get(
  "/listBrands",
  validateRequest(listBrandsSchema, "query"),
  controller.listBrands
);

router.get(
  "/getBrandById/:id",
  validateRequest(getBrandByIdSchema, "params"),
  controller.getBrandById
);

router.put(
  "/updateBrand/:id",
  validateRequest(updateBrandParamsSchema, "params"),
  validateRequest(updateBrandSchema),
  controller.updateBrand
);

router.delete(
  "/deleteBrand/:id",
  validateRequest(updateBrandParamsSchema, "params"),
  controller.deleteBrand
);

export default router;