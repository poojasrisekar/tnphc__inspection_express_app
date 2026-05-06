import { Request, Response } from "express";
import {
  createPlinthStageUsecase,
  getAllPlinthStageUsecase,
  getPlinthStageByIdUsecase,
  updatePlinthStageUsecase,
  deletePlinthStageUsecase
} from "./PlinthStage.usecase";

export const createPlinthStage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createPlinthStageUsecase(
      req.body,
      req.files,
      req,
      userId
    );
    res.status(201).json({ success: true, message: "Created", data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllPlinthStage = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const result = await getAllPlinthStageUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getPlinthStageById = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;

    const result =
      await getPlinthStageByIdUsecase(projectId);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

export const updatePlinthStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id;
    const result = await updatePlinthStageUsecase(
      id,
      req.body,
      req.files,
      req,
      userId
    );
    res.status(200).json({ success: true, message: "Updated", data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deletePlinthStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await deletePlinthStageUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};