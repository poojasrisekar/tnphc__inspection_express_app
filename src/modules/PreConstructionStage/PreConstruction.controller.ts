import { Request, Response } from "express";

import {
  createPreConstructionUsecase,
  getAllPreConstructionUsecase,
  getPreConstructionByIdUsecase,
  updatePreConstructionUsecase
} from "./PreConstruction.usecase";

export const createPreConstruction = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user?.id;

    const result = await createPreConstructionUsecase(
      req.body,
      req.files,
      req,
      userId
    );

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: result
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const getAllPreConstruction = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId } = req.query;

    const result = await getAllPreConstructionUsecase(
      projectId as string
    );

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

export const getPreConstructionById = async (
  req: Request,
  res: Response
) => {
  try {
    let { projectId } = req.params;

    // FIX TYPESCRIPT ERROR
    if (Array.isArray(projectId)) {
      projectId = projectId[0];
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project Id is required"
      });
    }

    const result =
      await getPreConstructionByIdUsecase(projectId);

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

export const updatePreConstruction = async (
  req: Request,
  res: Response
) => {
  try {
    let { id } = req.params;

    // FIX TYPESCRIPT ERROR
    if (Array.isArray(id)) {
      id = id[0];
    }

    const userId = (req as any).user?.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "PreConstruction ID is required"
      });
    }

    const result = await updatePreConstructionUsecase(
      id,
      req.body,
      req.files,
      req,
      userId
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: result
    });

  } catch (err: any) {
    const isNotFound =
      err.message === "PreConstruction record not found";

    res.status(isNotFound ? 404 : 400).json({
      success: false,
      message: err.message
    });
  }
};