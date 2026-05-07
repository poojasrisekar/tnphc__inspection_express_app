import { Request, Response } from "express";
import {
  createBuildingInspectionUsecase,
  getAllBuildingInspectionUsecase,
  
  getBuildingInspectionByProjectIdUsecase,
  updateBuildingInspectionUsecase,
  deleteBuildingInspectionUsecase
} from "./BuildingInspection.usecase";

export const createBuildingInspection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await createBuildingInspectionUsecase(req.body, req.files, req, userId);
    res.status(201).json({ success: true, message: "Created", data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllBuildingInspection = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const result = await getAllBuildingInspectionUsecase(projectId);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getBuildingInspectionByProjectId = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;

    const result =
      await getBuildingInspectionByProjectIdUsecase(projectId);

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

export const updateBuildingInspection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id;
    const result = await updateBuildingInspectionUsecase(id, req.body, req.files, req, userId);
    res.status(200).json({ success: true, message: "Updated", data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteBuildingInspection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await deleteBuildingInspectionUsecase(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};