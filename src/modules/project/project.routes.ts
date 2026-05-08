import express from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
  getProjectDashboardController,
  getProjectsByUserController
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


// ✅ GET ALL PROJECTS
router.get(
  "/getProjects",
  validateRequest(getAllProjectsSchema, "query"),
  getAllProjectsController
);


// ✅ GET USER ASSIGNED PROJECTS
router.get(
  "/getProjects/:userId",
  getProjectsByUserController
);


// ✅ GET SINGLE PROJECT DETAILS
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

router.get(
  "/getProjectDashboard",
  getProjectDashboardController
);

export default router;