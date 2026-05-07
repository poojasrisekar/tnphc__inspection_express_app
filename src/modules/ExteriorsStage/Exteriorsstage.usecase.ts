import {
  getExteriorsFullViewService,
  upsertExteriorsProgressDB,
  upsertExteriorsQualityDB,
  getExteriorsProgressByProjectService,
  getExteriorsQualityByProjectService,
  deleteExteriorsProgressDB
} from "./Exteriorsstage.service";

// 🔹 FULL VIEW
export const getExteriorsFullViewUsecase =
  async (projectId: string) => {
    return getExteriorsFullViewService(projectId);
  };

// 🔹 CREATE PROGRESS
export const createExteriorsProgressUsecase =
  async (
    body: any,
    files: any,
    req: any
  ) => {

    const baseUrl =
      `${req.protocol}://${req.get("host")}`;

    const progressPhoto =
      (files?.progressPhoto || []).map(
        (f: any) => ({
          fileName: f.filename,
          url: `${baseUrl}/uploads/${f.filename}`
        })
      );

    return upsertExteriorsProgressDB({
      projectId: body.projectId,

      block: body.block,

      floor: body.floor,

      stageOfWork: body.stageOfWork,

      isCompleted:
        body.isCompleted === "true" ||
        body.isCompleted === true,

      progressRemarks:
        body.progressRemarks,

      progressPhoto,

      status:
        body.isCompleted === "true" ||
        body.isCompleted === true
          ? "COMPLETED"
          : "IN_PROGRESS"
    });
  };

// 🔹 CREATE QUALITY
export const createExteriorsQualityUsecase =
  async (
    body: any,
    files: any,
    req: any
  ) => {

    const baseUrl =
      `${req.protocol}://${req.get("host")}`;

    const getFiles = (key: string) =>
      (files?.[key] || []).map(
        (f: any) => ({
          fileName: f.filename,
          url: `${baseUrl}/uploads/${f.filename}`
        })
      );

    return upsertExteriorsQualityDB({

      projectId: body.projectId,

      workStartedDate:
        body.workStartedDate
          ? new Date(body.workStartedDate)
          : null,

      isDelayed:
        body.isDelayed === "true" ||
        body.isDelayed === true,

      delayDays:
        body.delayDays
          ? Number(body.delayDays)
          : null,

      delayReason:
        body.delayReason,

      delayOther:
        body.delayOther,

      generalRemarks:
        body.generalRemarks,

      // 🔹 CEMENT
      cementGradeId:
        body.cementGradeId,

      cementBrandId:
        body.cementBrandId,

      cementRemarks:
        body.cementRemarks,

      cementLabTest:
        body.cementLabTest,

      cementPhoto:
        getFiles("cementPhoto"),

      // 🔹 SAND
      sandType:
        body.sandType,

      sandLabTest:
        body.sandLabTest,

      sandPhoto:
        getFiles("sandPhoto"),

      sandSieveTestDone:
        body.sandSieveTestDone === "true" ||
        body.sandSieveTestDone === true,

      sandSieveLabTest:
        body.sandSieveLabTest,

      sandSievePhoto:
        getFiles("sandSievePhoto"),

      // 🔹 AGGREGATE
      aggregateSize:
        body.aggregateSize
          ? Number(body.aggregateSize)
          : null,

      aggregateLabTest:
        body.aggregateLabTest,

      aggregatePhoto:
        getFiles("aggregatePhoto"),

      // 🔹 WATER
      waterLabTest:
        body.waterLabTest,

      waterPhoto:
        getFiles("waterPhoto"),

      // 🔹 CONCRETE
      concreteLabTest:
        body.concreteLabTest,

      concretePhoto:
        getFiles("concretePhoto"),

      concreteQualityTestDone:
        body.concreteQualityTestDone === "true" ||
        body.concreteQualityTestDone === true,

      concreteQualityLabTest:
        body.concreteQualityLabTest,

      concreteQualityPhoto:
        getFiles("concreteQualityPhoto"),

      // 🔹 BRICKS
      bricksLabTest:
        body.bricksLabTest,

      bricksPhoto:
        getFiles("bricksPhoto"),

      bricksQualityTestDone:
        body.bricksQualityTestDone === "true" ||
        body.bricksQualityTestDone === true,

      bricksQualityLabTest:
        body.bricksQualityLabTest,

      bricksQualityPhoto:
        getFiles("bricksQualityPhoto"),

      // 🔹 PLASTERING
      plasteringTestDone:
        body.plasteringTestDone === "true" ||
        body.plasteringTestDone === true,

      plasteringLabTest:
        body.plasteringLabTest,

      plasteringPhoto:
        getFiles("plasteringPhoto"),

      plasteringRemarks:
        body.plasteringRemarks,

      // 🔹 DOORS & WINDOWS
      doorWindowType:
        body.doorWindowType,

      upvcBrand:
        body.upvcBrand,

      glassBrand:
        body.glassBrand,

      glassThickness:
        body.glassThickness,

      doorWindowRemarks:
        body.doorWindowRemarks,

      // 🔹 INTERIOR TILES
      interiorFloorType:
        body.interiorFloorType,

      interiorTileBrand:
        body.interiorTileBrand,

      interiorTileRemarks:
        body.interiorTileRemarks,

      // 🔹 ROOF TILES
      roofFloorType:
        body.roofFloorType,

      roofTileBrand:
        body.roofTileBrand,

      roofTileRemarks:
        body.roofTileRemarks,

      // 🔹 INTERIOR PAINTING
      interiorPaintBrand:
        body.interiorPaintBrand,

      interiorPaintingQuality:
        body.interiorPaintingQuality,

      // 🔹 EXTERIOR PAINTING
      exteriorPaintBrand:
        body.exteriorPaintBrand,

      exteriorPaintingQuality:
        body.exteriorPaintingQuality,

      // 🔹 FINAL
      qualityRemarks:
        body.qualityRemarks
    });
  };

// 🔹 GET PROGRESS
export const getExteriorsProgressByProjectUsecase =
  async (projectId: string) => {
    return getExteriorsProgressByProjectService(
      projectId
    );
  };

// 🔹 GET QUALITY
export const getExteriorsQualityByProjectUsecase =
  async (projectId: string) => {
    return getExteriorsQualityByProjectService(
      projectId
    );
  };

// 🔹 DELETE
export const deleteExteriorsProgressUsecase =
  async (id: string) => {
    return deleteExteriorsProgressDB(id);
  };