import { Request, Response } from "express";
import {
  createInteriorsStageUsecase,
  getAllInteriorsStageUsecase,
  getInteriorsStageByIdUsecase,
  updateInteriorsStageUsecase,
  deleteInteriorsStageUsecase
} from "./InteriorsStage.usecase";

export const createInteriorsStage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createInteriorsStageUsecase(
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

export const getAllInteriorsStage = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const result = await getAllInteriorsStageUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getInteriorsStageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await getInteriorsStageByIdUsecase(id);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateInteriorsStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id;
    const result = await updateInteriorsStageUsecase(
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

export const deleteInteriorsStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await deleteInteriorsStageUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};