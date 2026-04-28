import { Request, Response } from "express";
import * as usecase from "./grade.usecase";

export const createGrade = async (req: Request, res: Response) => {
  try {
    const result = await usecase.createGradeUsecase({
      ...req.body,
      userId: req.user?.id,
    });

    res.json({
      success: true,
      message: "Grade created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGradeById = async (req: Request, res: Response) => {
  try {
        const id = String(req.params.id); // ✅ FIX

    const result = await usecase.getGradeByIdUsecase(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateGrade = async (req: Request, res: Response) => {
  try {
        const id = String(req.params.id); // ✅ FIX

    const result = await usecase.updateGradeUsecase(
      id,
      {
        ...req.body,
        userId: req.user?.id,
      }
    );

    res.json({
      success: true,
      message: "Grade updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGrade = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    await usecase.deleteGradeUsecase(id);

    res.json({
      success: true,
      message: "Grade deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listGrades = async (req: Request, res: Response) => {
  try {
    const result = await usecase.listGradesUsecase(req.query);

    res.json({
      success: true,
      message: "Grades fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};