import { Request, Response } from "express";

import {
  getAdminDashboardReportUsecase
} from "./adminReports.usecase";

export const getAdminDashboardReportController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const pageNumber =
        req.query.pageNumber as
          | string
          | undefined;

      const pageSize =
        req.query.pageSize as
          | string
          | undefined;

      const search =
        req.query.search as
          | string
          | undefined;

      const data =
        await getAdminDashboardReportUsecase({
          pageNumber,
          pageSize,
          search
        });

      return res.status(200).json({
        success: true,
        ...data
      });

    } catch (e: any) {

      return res.status(500).json({
        success: false,
        message: e.message
      });
    }
  };