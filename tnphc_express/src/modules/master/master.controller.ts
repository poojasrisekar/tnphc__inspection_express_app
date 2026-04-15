import { Request, Response } from "express";
import * as usecase from "./master.usecase";

export const createMaster = async (req: Request, res: Response) => {
  try {
    const result = await usecase.createMasterUsecase({
      ...req.body,
      userId: req.user?.id,
    });

    res.json({
      success: true,
      message: "Master created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMasterById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const result = await usecase.getMasterByIdUsecase(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateMaster = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const result = await usecase.updateMasterUsecase(id, {
      ...req.body,
      userId: req.user?.id,
    });

    res.json({
      success: true,
      message: "Master updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMaster = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await usecase.deleteMasterUsecase(id);

    res.json({
      success: true,
      message: "Master deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listMasters = async (req: Request, res: Response) => {
  try {
    const result = await usecase.listMastersUsecase(req.query);

    res.json({
      success: true,
      message: "Masters fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};