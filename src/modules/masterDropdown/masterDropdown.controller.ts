import { Request, Response } from "express";

import * as usecase from "./masterDropdown.usecase";

// TYPE

export const createDropdownType = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await usecase.createDropdownTypeUsecase({
        ...req.body,
        userId: req.user?.id,
      });

    return res.status(201).json({
      success: true,
      message:
        "Dropdown type created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const listDropdownTypes = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await usecase.listDropdownTypesUsecase();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CATEGORY

export const createDropdownCategory =
  async (req: Request, res: Response) => {
    try {
      const result =
        await usecase.createDropdownCategoryUsecase(
          {
            ...req.body,
            userId: req.user?.id,
          }
        );

      return res.status(201).json({
        success: true,
        message:
          "Dropdown category created successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const listDropdownCategoryByType =
  async (req: Request, res: Response) => {
    try {
      const key = String(req.params.key);

      const result =
        await usecase.listDropdownCategoryByTypeUsecase(
          key
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };