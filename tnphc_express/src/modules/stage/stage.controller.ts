import { Request, Response } from "express";
import {
  createStageUsecase,
  getAllStagesUsecase,
  getStageByIdUsecase,
  updateStageUsecase,
  deleteStageUsecase
} from "./stage.usecase";

// CREATE
export const createStageController = async (req: any, res: Response) => {
  try {
    const result = await createStageUsecase(req.body, req.user);

    res.json({
      success: true,
      message: "Stage created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getAllStagesController = async (req: Request, res: Response) => {
  const result = await getAllStagesUsecase();

  res.json({
    success: true,
    total: result.length,
    data: result
  });
};

// GET BY ID
export const getStageByIdController = async (req: Request, res: Response) => {
                const id = String(req.params.id); // ✅ FIX

  const result = await getStageByIdUsecase(id);

  res.json({
    success: true,
    data: result
  });
};

// UPDATE
export const updateStageController = async (req: any, res: Response) => {
  try {
    const result = await updateStageUsecase(
      req.params.id,
      req.body,
      req.user
    );

    res.json({
      success: true,
      message: "Stage updated",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteStageController = async (req: any, res: Response) => {
  try {
    await deleteStageUsecase(req.params.id, req.user);

    res.json({
      success: true,
      message: "Stage deleted"
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};