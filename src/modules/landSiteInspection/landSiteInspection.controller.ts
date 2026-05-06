import { Request, Response } from "express";
import {
  createInspectionUsecase,
  getAllInspectionUsecase,
  getInspectionByIdUsecase,
  updateInspectionUsecase,
  deleteInspectionUsecase,
} from "./landSiteInspection.usecase";

export const createInspection = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user?.id;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const data = await createInspectionUsecase(
      req.body,
      files,
      userId,
      baseUrl
    );

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.log(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateInspection = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const data = await updateInspectionUsecase(
      id,
      req.body,
      files,
      baseUrl
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.log(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllInspection = async (
  req: Request,
  res: Response
) => {
  try {
    
const { projectId } = req.query;

const data = await getAllInspectionUsecase(
  projectId as string | undefined
);

    res.status(200).json({
      success: true,
      total: data.length,
      data,
    });
  } catch (err: any) {
    console.log(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getInspectionById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const data = await getInspectionByIdUsecase(id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.log(err);

    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteInspection = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    await deleteInspectionUsecase(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err: any) {
    console.log(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};