import express from "express";

import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
  getProjectDashboardController
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
// ✅ GET USER ASSIGNED PROJECTS USING QUERY PARAM
//
// EXAMPLES:
// /getProjects
// /getProjects?userId=123
// /getProjects?pageNumber=1&pageSize=10
// /getProjects?userId=123&search=test
//
router.get(
  "/getProjects",
  validateRequest(getAllProjectsSchema, "query"),
  getAllProjectsController
);


// ✅ GET SINGLE PROJECT DETAILS
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