import express from "express";

import {
  getAdminDashboardReportController
} from "./adminReports.controller";

const router = express.Router();

router.get(
  "/dashboard",
  getAdminDashboardReportController
);

router.get(
  "/dashboard/:userId",
  getAdminDashboardReportController
)
export default router;