import { Request, Response } from "express";
import {
  createProjectUsecase,
  getAllProjectsUsecase,
  getProjectByIdUsecase,
  updateProjectUsecase,
  deleteProjectUsecase,
  getProjectDashboardUsecase,
  getProjectsByUserUsecase
} from "./project.usecase";

type StatusType = string | undefined;

export const createProjectController = async (req: Request, res: Response) => {
  
  try {
    const result = await createProjectUsecase(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const getSingleValue = (val: any) =>
      Array.isArray(val) ? val[0] : val;

    const pageNumber = req.query.pageNumber as string | undefined;
    const pageSize = req.query.pageSize as string | undefined;
    const search = req.query.search as string | undefined;
    const status = req.query.status as StatusType;

    const districtId = getSingleValue(req.query.districtId);
    const departmentId = getSingleValue(req.query.departmentId);
    const specialUnitId = getSingleValue(req.query.specialUnitId);

    // ✅ ADD THIS
    const userId = getSingleValue(req.query.userId);

    const result = await getAllProjectsUsecase({
      pageNumber,
      pageSize,
      search,
      status,
      districtId,
      departmentId,
      specialUnitId,
      userId
    });

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProjectByIdController = async (req: Request, res: Response) => {
  try {
                const id = String(req.params.id); // ✅ FIX

    const result = await getProjectByIdUsecase(id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateProjectController = async (req: Request, res: Response) => {
  try {
                const id = String(req.params.id); // ✅ FIX

    const result = await updateProjectUsecase(id, req.body);

    res.status(200).json({
      success: true,
      message: "Project Updated successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProjectController = async (req: Request, res: Response) => {
  try {
                const id = String(req.params.id); // ✅ FIX

    await deleteProjectUsecase(id);

    res.status(200).json({
      success: true,
      message: "Project Deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectDashboardController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getProjectDashboardUsecase();

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProjectsByUserController = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);

    const result = await getProjectsByUserUsecase(userId);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};