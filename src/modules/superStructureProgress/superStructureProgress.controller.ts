import { Request, Response } from "express";
import {
  getSuperStructureFullViewUsecase,
  createProgressUsecase,
  createQualityUsecase,
  deleteProgressUsecase,
  getProgressByProjectUsecase,
  getQualityByProjectUsecase
} from "./superStructureProgress.usecase";

// 🔹 helper (VERY IMPORTANT)
const getSingleValue = (val: any): string => {
  return Array.isArray(val) ? val[0] : val;
};

// 🔹 GET
export const getSuperStructureFullViewController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = getSingleValue(req.params.projectId);

    const data = await getSuperStructureFullViewUsecase(projectId);

    res.status(200).json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// 🔹 PROGRESS
export const createProgressController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await createProgressUsecase(
      req.body,
      req.files,
      req
    );

    res.status(200).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// 🔹 QUALITY
export const createQualityController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await createQualityUsecase(
      req.body,
      req.files,
      req
    );

    res.status(200).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// 🔹 DELETE
export const deleteProgressController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getSingleValue(req.params.id);

    await deleteProgressUsecase(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getProgressByProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = getSingleValue(
      req.params.projectId
    );

    const data =
      await getProgressByProjectUsecase(projectId);

    res.status(200).json({
      success: true,
      data
    });

  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message
    });
  }
};

export const getQualityByProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = getSingleValue(
      req.params.projectId
    );

    const data =
      await getQualityByProjectUsecase(projectId);

    res.status(200).json({
      success: true,
      data
    });

  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message
    });
  }
};