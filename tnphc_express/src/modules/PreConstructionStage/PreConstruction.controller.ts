import { Request, Response } from "express";
import {
  createPreConstructionUsecase
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