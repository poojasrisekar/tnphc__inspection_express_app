import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "./roles.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createRoleSchema,
  updateRoleSchema,
  getAllRolesSchema,
  getRoleByIdSchema,
  deleteRoleSchema,
  updateRoleParamsSchema,
} from "./roles.schema";

const router = express.Router();

/**
 * ✅ Create Role
 */
router.post(
  "/createRole",
  validateRequest(createRoleSchema, "body"),
  createRole
);

/**
 * ✅ Get All Roles (query validation)
 */
router.get(
  "/getAllRoles",
  validateRequest(getAllRolesSchema, "query"),
  getAllRoles
);

/**
 * ✅ Get Role By ID
 */
router.get(
  "/getRoleById/:id",
  validateRequest(getRoleByIdSchema, "params"),
  getRoleById
);

/**
 * ✅ Update Role
 */
router.put(
  "/updateRole/:id",
  validateRequest(updateRoleParamsSchema, "params"),
  validateRequest(updateRoleSchema, "body"),
  updateRole
);

/**
 * ✅ Delete Role
 */
router.patch(
  "/deleteRole/:id",
  validateRequest(deleteRoleSchema, "params"),
  deleteRole
);

export default router;