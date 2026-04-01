import { Request, Response } from "express";
import {
  getAllUsersUsecase,
  getUserByIdUsecase,
  createUserUsecase,
  updateUserUsecase,
  deleteUserUsecase,
  loginUsecase,
} from "./user.usecase";

/**
 * Get all users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersUsecase();
  res.json(users);
};

/**
 * Get user by ID
 */
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await getUserByIdUsecase(req.params.id);
  res.json(user);
};

/**
 * Create user
 */
export const createUser = async (req: Request, res: Response) => {
  const user = await createUserUsecase(req.body);
  res.status(201).json(user);
};

/**
 * Update user
 */
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await updateUserUsecase(req.params.id, req.body);
  res.json(user);
};

/**
 * Delete user
 */
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await deleteUserUsecase(
    req.params.id,
    req.body.updatedById
  );

  res.json({
    message: "User deleted successfully",
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUsecase(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};