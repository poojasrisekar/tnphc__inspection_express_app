import { Request, Response } from "express";

import * as usecase from "./dropdown.usecase";

export const getMaterialBrandGradeDropdown =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await usecase.getMaterialBrandGradeDropdownUsecase();

      return res.status(200).json({
        success: true,
        message: "Dropdown fetched successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };