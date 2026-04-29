import { Request, Response } from "express";
import {
  createTakeoverDevelopmentWorkUsecase,
  getAllTakeoverDevelopmentWorkUsecase,
  getTakeoverDevelopmentWorkByIdUsecase,
  updateTakeoverDevelopmentWorkUsecase,
  deleteTakeoverDevelopmentWorkUsecase
} from "./takeoverDevelopmentWork.usecase";

export const createTakeoverDevelopmentWork = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const result = await createTakeoverDevelopmentWorkUsecase(
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

export const getAllTakeoverDevelopmentWork = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string; // ✅ FIX

    const result = await getAllTakeoverDevelopmentWorkUsecase(projectId);

    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getTakeoverDevelopmentWorkById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ✅ FIX

    const result = await getTakeoverDevelopmentWorkByIdUsecase(id);

    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateTakeoverDevelopmentWork = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ✅ FIX
    const userId = (req as any).user?.id;

    const result = await updateTakeoverDevelopmentWorkUsecase(
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

export const deleteTakeoverDevelopmentWork = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ✅ FIX

    await deleteTakeoverDevelopmentWorkUsecase(id);

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};