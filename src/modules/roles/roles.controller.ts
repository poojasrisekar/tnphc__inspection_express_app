import { Request, Response } from "express";
import {
  createRoleUsecase,
  getAllRolesUsecase,
  getRoleByIdUsecase,
  updateRoleUsecase,
  deleteRoleUsecase,
} from "./roles.usecase";

/**
 * Create Role
 */
export const createRole = async (req: Request, res: Response) => {
  try {
    const result = await createRoleUsecase(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get All Roles
 */
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const result = await getAllRolesUsecase(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Role By ID
 */
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await getRoleByIdUsecase(id);

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Role
 */
export const updateRole = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await updateRoleUsecase(id, req.body);

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete Role
 */
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const result = await deleteRoleUsecase(id);

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};