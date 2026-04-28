import { Request, Response } from "express";
import {
  createInspectionUsecase,
  getAllInspectionUsecase,
  getInspectionByIdUsecase,
  updateInspectionUsecase,
  deleteInspectionUsecase
} from "./landSiteInspection.usecase";

export const createInspection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const files = req.files as Express.Multer.File[];

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const treesPhoto = files?.map((file) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`
    })) || [];

    // CONVERT ALL TYPES PROPERLY
    const data = {
      ...req.body,

      //  numbers
      encroachmentPercent: Number(req.body.encroachmentPercent),
      waterDepth: Number(req.body.waterDepth),
      waterDurationDays: Number(req.body.waterDurationDays),
      treesCount: req.body.treesCount
        ? Number(req.body.treesCount)
        : null,
      monumentDistance: Number(req.body.monumentDistance),
      seaDistance: Number(req.body.seaDistance),
      forestDistance: Number(req.body.forestDistance),
      waterBodyDistance: Number(req.body.waterBodyDistance),
      burialDistance: Number(req.body.burialDistance),
      roadWidth: req.body.roadWidth ? Number(req.body.roadWidth) : null,
      serviceDistance: req.body.serviceDistance
        ? Number(req.body.serviceDistance)
        : null,

      //  enum fix (IMPORTANT)
      isEncroachment: req.body.isEncroachment,
      isCourtCase: req.body.isCourtCase,
      hasStructure: req.body.hasStructure,
      isLowLying: req.body.isLowLying,
      hasPowerLines: req.body.hasPowerLines,
      isNearMonument: req.body.isNearMonument,
      isNearSea: req.body.isNearSea,
      isNearForest: req.body.isNearForest,
      isNearBurial: req.body.isNearBurial,

      //  FIX THIS (BOOLEAN in DB)
      isNearWaterBody: req.body.isNearWaterBody === "Yes",

      treesPhoto,
    };

    const result = await createInspectionUsecase(data, userId);

    res.status(201).json({
      success: true,
      message: "Inspection created successfully",
      data: result
    });
  } catch (err: any) {
    console.log("ERROR:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllInspection = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;

    const data = await getAllInspectionUsecase(projectId as string);

    res.json({
      success: true,
      total: data.length,
      data
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getInspectionById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    const data = await getInspectionByIdUsecase(id);

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateInspection = async (req: Request, res: Response) => {
  try {
            const id = String(req.params.id); // ✅ FIX

    const data = await updateInspectionUsecase(id, req.body);

    res.json({
      success: true,
      message: "Updated successfully",
      data
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteInspection = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id); // ✅ FIX
    await deleteInspectionUsecase(id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};