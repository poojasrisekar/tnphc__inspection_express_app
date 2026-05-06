import { Request, Response } from "express";
import {
  createPreConstructionUsecase,
   getAllPreConstructionUsecase,
  getPreConstructionByIdUsecase
} from "./PreConstruction.usecase";

const getFiles = (files: any, field: string, baseUrl: string) => {
  return (files?.[field] || []).map((file: any) => ({
    fileName: file.filename,
    url: `${baseUrl}/uploads/${file.filename}`
  }));
};

export const createPreConstruction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    console.log('--------------------->>> REQ',req.body)
    const result = await createPreConstructionUsecase(
      req.body,
      req.files,
      req
    );

    res.status(201).json({
      success: true,
      message: "Created",
      data: result
    });

  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const getAllPreConstruction = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;

    const result = await getAllPreConstructionUsecase(projectId as string);

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

export const getPreConstructionById = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    // ✅ FIX
    if (Array.isArray(id)) {
      id = id[0];
    }

    if (!id) {
      throw new Error("Id is required");
    }

    const result = await getPreConstructionByIdUsecase(id);

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