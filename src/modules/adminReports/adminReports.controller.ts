import { Request, Response } from "express";

import {
  getAdminDashboardReportUsecase
} from "./adminReports.usecase";

export const getAdminDashboardReportController =
  async (req: Request, res: Response) => {

    try {

      const data =
        await getAdminDashboardReportUsecase();

      return res.status(200).json({
        success: true,
        data
      });

    } catch (e: any) {

      return res.status(500).json({
        success: false,
        message: e.message
      });
    }
  };