import { Router } from "express";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  listDepartments,
} from "./department.controllers";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
  getDepartmentByIdSchema,
  deleteDepartmentSchema,
  listDepartmentsSchema,
  updateDepartmentParamsSchema,
} from "./department.schema";

const router = Router();

// Create
router.post(
  "/createDepartment",
  validateRequest(createDepartmentSchema),
  createDepartment
);

// List
router.get(
  "/listDepartments",
  validateRequest(listDepartmentsSchema, "query"),
  listDepartments
);

// Get By ID
router.get(
  "/department/:id",
  validateRequest(getDepartmentByIdSchema, "params"),
  getDepartmentById
);

// Update
router.put(
  "/updateDepartment/:id",
  validateRequest(updateDepartmentParamsSchema, "params"),
  validateRequest(updateDepartmentSchema),
  updateDepartment
);

// Delete
router.delete(
  "/deleteDepartment/:id",
  validateRequest(deleteDepartmentSchema, "params"),
  deleteDepartment
);

export default router;