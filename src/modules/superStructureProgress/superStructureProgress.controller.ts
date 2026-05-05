import { Request, Response } from "express";
import {
  getSuperStructureProgressViewUsecase,
  createSuperStructureProgressUsecase,
  updateSuperStructureProgressUsecase
} from "./superStructureProgress.usecase";

// ✅ GET
export const getSuperStructureProgressViewController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = String(req.params.projectId);

    const data =
      await getSuperStructureProgressViewUsecase(projectId);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ CREATE
export const createSuperStructureProgressController = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await createSuperStructureProgressUsecase(
        req.body,
        req.files,
        req,
        req.user?.id
      );

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ UPDATE
export const updateSuperStructureProgressController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const result =
      await updateSuperStructureProgressUsecase(
        id,
        req.body,
        req.files,
        req,
        req.user?.id
      );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};