import { Request, Response } from "express";
import {
  createFoundationProgressUsecase,
  getAllFoundationProgressUsecase,
  getFoundationProgressByIdUsecase,
  updateFoundationProgressUsecase,
  deleteFoundationProgressUsecase
} from "./FoundationProgress.usecase";

export const createFoundationProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createFoundationProgressUsecase(
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

export const getAllFoundationProgress = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;  
    const result = await getAllFoundationProgressUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getFoundationProgressById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;  
    const result = await getFoundationProgressByIdUsecase(id);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateFoundationProgress = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;  
    const userId = (req as any).user?.id;
    const result = await updateFoundationProgressUsecase(
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

export const deleteFoundationProgress = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;  
    await deleteFoundationProgressUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};