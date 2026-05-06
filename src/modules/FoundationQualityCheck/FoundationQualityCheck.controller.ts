import { Request, Response } from "express";
import {
  createFoundationQualityCheckUsecase,
  getAllFoundationQualityCheckUsecase,
  getFoundationQualityCheckByIdUsecase,
  updateFoundationQualityCheckUsecase,
  deleteFoundationQualityCheckUsecase,
   getFoundationCombinedByProjectUsecase,
  getAllFoundationCombinedUsecase
} from "./FoundationQualityCheck.usecase";

export const createFoundationQualityCheck = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createFoundationQualityCheckUsecase(
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

export const getAllFoundationQualityCheck = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;
    const result = await getAllFoundationQualityCheckUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getFoundationQualityCheckById = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;

    const result =
      await getFoundationQualityCheckByIdUsecase(projectId);

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

export const updateFoundationQualityCheck = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id;
    const result = await updateFoundationQualityCheckUsecase(
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

export const deleteFoundationQualityCheck = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    await deleteFoundationQualityCheckUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const getFoundationCombinedByProject = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    const result = await getFoundationCombinedByProjectUsecase(projectId);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// 🔹 ALL PROJECTS (ADMIN)
export const getAllFoundationCombined = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllFoundationCombinedUsecase();

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};