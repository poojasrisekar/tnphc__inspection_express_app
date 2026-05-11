import { Request, Response } from "express";
import * as usecase from "./brand.usecase";

export const createBrand = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await usecase.createBrandUsecase({
      ...req.body,
      userId: req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBrandById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const result =
      await usecase.getBrandByIdUsecase(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBrand = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const result =
      await usecase.updateBrandUsecase(id, {
        ...req.body,
        userId: req.user?.id,
      });

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    await usecase.deleteBrandUsecase(id);

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const listBrands = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await usecase.listBrandsUsecase(req.query);

    return res.status(200).json({
      success: true,
      message: "Brands fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};