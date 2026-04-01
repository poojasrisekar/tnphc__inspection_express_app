import express from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
} from "./project.controller";

import { validateRequest } from "../../middleware/validateRequest";

import {
  createProjectSchema,
  updateProjectSchema,
  getProjectByIdSchema,
  deleteProjectSchema,
  getAllProjectsSchema
} from "./project.schema";

const router = express.Router();

router.post(
  "/createProject",
  validateRequest(createProjectSchema, "body"),
  createProjectController
);

router.get(
  "/getAllProjects",
  validateRequest(getAllProjectsSchema, "query"),
  getAllProjectsController
);

router.get(
  "/getProjectById/:id",
  validateRequest(getProjectByIdSchema, "params"),
  getProjectByIdController
);

router.put(
  "/updateProject/:id",
  validateRequest(updateProjectSchema, "body"),
  updateProjectController
);

router.patch(
  "/deleteProject/:id",
  validateRequest(deleteProjectSchema, "params"),
  deleteProjectController
);

export default router;