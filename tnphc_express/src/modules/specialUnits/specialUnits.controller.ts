// controllers/specialUnit.controller.ts

import { Request, Response } from "express";
import {
  createSpecialUnitUsecase,
  getAllSpecialUnitsUsecase,
  getSpecialUnitByIdUsecase,
  updateSpecialUnitUsecase,
  deleteSpecialUnitUsecase
} from "./specialUnits.usecase";

export const createSpecialUnitController = async (req: Request, res: Response) => {
  try {
    const result = await createSpecialUnitUsecase(req.body);

    res.status(201).json({
      success: true,
      message: "Special Unit created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSpecialUnitsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllSpecialUnitsUsecase(req.query);

    res.status(200).json({
      success: true,
      message: "Special Units retrieved successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSpecialUnitByIdController = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    const result = await getSpecialUnitByIdUsecase(id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateSpecialUnitController = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    const result = await updateSpecialUnitUsecase(id, req.body);

    res.status(200).json({
      success: true,
      message: "Special Unit Updated successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSpecialUnitController = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

  const result = await deleteSpecialUnitUsecase(id);

    res.status(200).json({
      success: true,
      message: "Special Unit Deleted successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};