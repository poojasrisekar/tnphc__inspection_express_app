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


// ✅ CREATE PROJECT
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


// ✅ GET ALL ASSIGNED PROJECTS
router.get(
  "/getAssignedProjects",
  getProjectsByUserController
);


// ✅ GET USER WISE ASSIGNED PROJECTS
router.get(
  "/getAssignedProjects/:userId",
  getProjectsByUserController
);


// ✅ GET PROJECT BY ID
router.get(
  "/getProjectById/:id",
  validateRequest(getProjectByIdSchema, "params"),
  getProjectByIdController
);


// ✅ UPDATE PROJECT
router.put(
  "/updateProject/:id",
  validateRequest(updateProjectSchema, "body"),
  updateProjectController
);


// ✅ DELETE PROJECT
router.patch(
  "/deleteProject/:id",
  validateRequest(deleteProjectSchema, "params"),
  deleteProjectController
);


// ✅ PROJECT DASHBOARD
router.get(
  "/getProjectDashboard",
  getProjectDashboardController
);

export default router;