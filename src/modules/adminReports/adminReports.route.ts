import express from "express";

import {
  getAdminDashboardReportController
} from "./adminReports.controller";

const router = express.Router();

router.get(
  "/dashboard",
  getAdminDashboardReportController
);

export default router;