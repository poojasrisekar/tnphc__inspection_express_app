import { Request, Response } from "express";
import {
  createDepartmentUsecase,
  getDepartmentByIdUsecase,
  updateDepartmentUsecase,
  deleteDepartmentUsecase,
  listDepartmentsUsecase,
} from "./department.usecase";

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const data = await createDepartmentUsecase(req.body);
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    const data = await getDepartmentByIdUsecase(id);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    const data = await updateDepartmentUsecase(id, req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    await deleteDepartmentUsecase(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const listDepartments = async (req: Request, res: Response) => {
  try {
    const result = await listDepartmentsUsecase(req.query);
    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};