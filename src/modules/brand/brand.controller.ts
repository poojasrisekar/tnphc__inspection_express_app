import { Request, Response } from "express";
import * as usecase from "./brand.usecase";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const result = await usecase.createBrandUsecase({
      ...req.body,
      userId: req.user?.id,
    });

    res.json({
      success: true,
      message: "Brand created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await usecase.getBrandByIdUsecase(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
        const id = String(req.params.id); // ✅ FIX
    const result = await usecase.updateBrandUsecase(
      id,
      {
        ...req.body,
        userId: req.user?.id,
      }
    );

    res.json({
      success: true,
      message: "Brand updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
        const id = String(req.params.id); // ✅ FIX
    await usecase.deleteBrandUsecase(id);

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listBrands = async (req: Request, res: Response) => {
  try {
    const result = await usecase.listBrandsUsecase(req.query);

    res.json({
      success: true,
      message: "Brands fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};