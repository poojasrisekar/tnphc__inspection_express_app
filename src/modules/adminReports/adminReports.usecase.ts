import {
  getAdminDashboardReportService
} from "./adminReports.service";

export const getAdminDashboardReportUsecase =
  async () => {

    return getAdminDashboardReportService();
  };