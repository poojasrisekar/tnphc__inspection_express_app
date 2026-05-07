import {
  getInteriorsFullViewService,
  upsertInteriorsProgressDB,
  upsertInteriorsQualityDB,
  getInteriorsProgressByProjectService,
  getInteriorsQualityByProjectService,
  deleteInteriorsProgressDB
} from "./InteriorsStage.service";

// 🔹 FULL VIEW
export const getInteriorsFullViewUsecase =
  async (projectId: string) => {
    return getInteriorsFullViewService(projectId);
  };

// 🔹 CREATE PROGRESS
export const createInteriorsProgressUsecase =
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

    return upsertInteriorsProgressDB({
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
export const createInteriorsQualityUsecase =
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

    return upsertInteriorsQualityDB({
      projectId: body.projectId,

      workStartedDate:
        body.workStartedDate
          ? new Date(body.workStartedDate)
          : null,

      isDelay:
        body.isDelay === "true" ||
        body.isDelay === true,

      delayDays:
        body.delayDays
          ? Number(body.delayDays)
          : null,

      delayReason: body.delayReason,

      delayOtherReason:
        body.delayOtherReason,

      // CEMENT
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

      // SAND
      sandType: body.sandType,

      sandLabTest:
        body.sandLabTest,

      sandPhoto:
        getFiles("sandPhoto"),

      sandSieveTestDone:
        body.sandSieveTestDone ===
          "true" ||
        body.sandSieveTestDone ===
          true,

      sandSieveLabTest:
        body.sandSieveLabTest,

      sandSievePhoto:
        getFiles("sandSievePhoto"),

      // AGGREGATE
      aggregateSize:
        body.aggregateSize
          ? Number(body.aggregateSize)
          : null,

      aggregateLabTest:
        body.aggregateLabTest,

      aggregatePhoto:
        getFiles("aggregatePhoto"),

      // WATER
      waterLabTest:
        body.waterLabTest,

      waterPhoto:
        getFiles("waterPhoto"),

      // CONCRETE
      concreteLabTest:
        body.concreteLabTest,

      concretePhoto:
        getFiles("concretePhoto"),

      concreteQualityTestDone:
        body.concreteQualityTestDone ===
          "true" ||
        body.concreteQualityTestDone ===
          true,

      concreteQualityLabTest:
        body.concreteQualityLabTest,

      concreteQualityPhoto:
        getFiles(
          "concreteQualityPhoto"
        ),

      // BRICKS
      bricksLabTest:
        body.bricksLabTest,

      bricksPhoto:
        getFiles("bricksPhoto"),

      bricksQualityTestDone:
        body.bricksQualityTestDone ===
          "true" ||
        body.bricksQualityTestDone ===
          true,

      bricksQualityLabTest:
        body.bricksQualityLabTest,

      bricksQualityPhoto:
        getFiles("bricksQualityPhoto"),

      // PLASTERING
      plasteringTestDone:
        body.plasteringTestDone ===
          "true" ||
        body.plasteringTestDone ===
          true,

      plasteringLabTest:
        body.plasteringLabTest,

      plasteringPhoto:
        getFiles("plasteringPhoto"),

      // DOORS & WINDOWS
      doorWoodType:
        body.doorWoodType,

      upvcBrand:
        body.upvcBrand,

      glassBrand:
        body.glassBrand,

      glassThickness:
        body.glassThickness,

      // TILES
      floorType:
        body.floorType,

      tileBrand:
        body.tileBrand,

      tileRemarks:
        body.tileRemarks,

      // PAINTING
      paintBrand:
        body.paintBrand,

      paintingQuality:
        body.paintingQuality,

      qualityRemarks:
        body.qualityRemarks
    });
  };

// 🔹 GET PROGRESS
export const getInteriorsProgressByProjectUsecase =
  async (projectId: string) => {
    return getInteriorsProgressByProjectService(
      projectId
    );
  };

// 🔹 GET QUALITY
export const getInteriorsQualityByProjectUsecase =
  async (projectId: string) => {
    return getInteriorsQualityByProjectService(
      projectId
    );
  };

// 🔹 DELETE
export const deleteInteriorsProgressUsecase =
  async (id: string) => {
    return deleteInteriorsProgressDB(id);
  };