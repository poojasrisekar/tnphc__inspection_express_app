import { Request, Response } from "express";
import {
  getAllUsersUsecase,
  getUserByIdUsecase,
  createUserUsecase,
  updateUserUsecase,
  deleteUserUsecase,
  loginUsecase,
  getDepartmentsUsecase,
  getDistrictsUsecase,
  getRolesUsecase,
} from "./user.usecase";

const ok = (res: Response, data: any, status = 200) =>
  res.status(status).json({ success: true, data });

const fail = (res: Response, error: any, status = 400) =>
  res.status(status).json({ success: false, message: error?.message ?? "Error" });

// ─── USERS ───────────────────────────────────────────────────────────────────

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersUsecase(req.query);
    ok(res, result);
  } catch (e) { fail(res, e); }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await getUserByIdUsecase(req.params.id);
    ok(res, user);
  } catch (e) { fail(res, e, 404); }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserUsecase(req.body);
    ok(res, user, 201);
  } catch (e: any) {
    // Duplicate / already-exists → 409
    const status = e.message?.includes("already") ? 409 : 400;
    fail(res, e, status);
  }
};

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await updateUserUsecase(req.params.id, req.body);
    ok(res, user);
  } catch (e: any) {
    const status = e.message?.includes("already") ? 409 : 400;
    fail(res, e, status);
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await deleteUserUsecase(req.params.id, req.body.updatedById);
    ok(res, { message: "User deleted successfully" });
  } catch (e) { fail(res, e); }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUsecase(req.body);
    ok(res, result);
  } catch (e) { fail(res, e, 401); }
};

// ─── DROPDOWNS ───────────────────────────────────────────────────────────────

export const getDepartments = async (_req: Request, res: Response) => {
  try { ok(res, await getDepartmentsUsecase()); }
  catch (e) { fail(res, e); }
};

export const getDistricts = async (_req: Request, res: Response) => {
  try { ok(res, await getDistrictsUsecase()); }
  catch (e) { fail(res, e); }
};

export const getRoles = async (_req: Request, res: Response) => {
  try { ok(res, await getRolesUsecase()); }
  catch (e) { fail(res, e); }
};