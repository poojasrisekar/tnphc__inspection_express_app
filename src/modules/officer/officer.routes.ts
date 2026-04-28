import { Router } from "express";
import {
  createOfficer,
  getOfficerById,
  updateOfficer,
  deleteOfficer,
  listOfficers,
} from "./officer.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createOfficerSchema,
  updateOfficerSchema,
  getOfficerByIdSchema,
  deleteOfficerSchema,
  listOfficersSchema,
  updateOfficerParamsSchema,
} from "./officer.schema";

const router = Router();

// Create
router.post(
  "/createOfficer",
  validateRequest(createOfficerSchema),
  createOfficer
);

// List
router.get(
  "/listOfficers",
  validateRequest(listOfficersSchema, "query"),
  listOfficers
);

// Get By ID
router.get(
  "/officer/:id",
  validateRequest(getOfficerByIdSchema, "params"),
  getOfficerById
);

// Update
router.put(
  "/updateOfficer/:id",
  validateRequest(updateOfficerParamsSchema, "params"),
  validateRequest(updateOfficerSchema),
  updateOfficer
);

// Delete (soft delete)
router.delete(
  "/deleteOfficer/:id",
  validateRequest(deleteOfficerSchema, "params"),
  deleteOfficer
);

export default router;