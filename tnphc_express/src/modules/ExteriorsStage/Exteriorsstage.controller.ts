import { Request, Response } from "express";
import {
  createExteriorsStageUsecase,
  getAllExteriorsStageUsecase,
  getExteriorsStageByIdUsecase,
  updateExteriorsStageUsecase,
  deleteExteriorsStageUsecase
} from "./Exteriorsstage.usecase";

export const createExteriorsStage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createExteriorsStageUsecase(
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

export const getAllExteriorsStage = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const result = await getAllExteriorsStageUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getExteriorsStageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await getExteriorsStageByIdUsecase(id);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateExteriorsStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id;
    const result = await updateExteriorsStageUsecase(
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

export const deleteExteriorsStage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await deleteExteriorsStageUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};