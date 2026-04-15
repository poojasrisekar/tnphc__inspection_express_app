import { NextFunction, Request, Response } from "express";
import * as usecase from "./material.usecase";
import { getMaterialsUsecase } from "./material.usecase";

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const result = await usecase.createMaterialUsecase({
      ...req.body
    });

    res.json({
      success: true,
      message: "Material created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await usecase.getMaterialByIdUsecase(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await usecase.updateMaterialUsecase(id,req.body);

    res.json({
      success: true,
      message: "Material updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
     const result = await usecase.deleteMaterialUsecase(id);

    res.json({
      success: true,
      message: "Material deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listMaterials = async (req: Request, res: Response) => {
  try {
    const result = await usecase.listMaterialsUsecase(req.query);

    res.json({
      success: true,
      message: "Materials fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMaterialsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getMaterialsUsecase(req.query as any);

    return res.status(200).json({
      code: "success",
      success: true,
      statusCode: 200,
      message: "Materials fetched successfully",
      data: {
        totalRecords: result.length,
        data: result,
      },
    });
  } catch (error) {
    next(error);
  }
};