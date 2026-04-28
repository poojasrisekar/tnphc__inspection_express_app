import { Request, Response } from "express";
import {
  createOfficerUsecase,
  getOfficerByIdUsecase,
  updateOfficerUsecase,
  deleteOfficerUsecase,
  listOfficersUsecase,
} from "./officer.usecase";

export const createOfficer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const data = await createOfficerUsecase(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Officer created successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getOfficerById = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX
    const data = await getOfficerByIdUsecase(id);

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateOfficer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
                const id = String(req.params.id); // ✅ FIX

    const data = await updateOfficerUsecase(
      id,
      req.body,
      userId
    );

    res.json({
      success: true,
      message: "Officer updated successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteOfficer = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX
    await deleteOfficerUsecase(id);

    res.json({
      success: true,
      message: "Officer deleted successfully",
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const listOfficers = async (req: Request, res: Response) => {
  try {
    const result = await listOfficersUsecase(req.query);

    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};