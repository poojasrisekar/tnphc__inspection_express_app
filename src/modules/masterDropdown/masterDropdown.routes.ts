import { Router } from "express";

import * as controller from "./masterDropdown.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createDropdownTypeSchema,
  createDropdownCategorySchema,
} from "./masterDropdown.schema";

const router = Router();

// TYPE

router.post(
  "/type",
  validateRequest(createDropdownTypeSchema),
  controller.createDropdownType
);

router.get(
  "/type",
  controller.listDropdownTypes
);

// CATEGORY

router.post(
  "/category",
  validateRequest(
    createDropdownCategorySchema
  ),
  controller.createDropdownCategory
);

router.get(
  "/category/by-type/:key",
  controller.listDropdownCategoryByType
);

export default router;