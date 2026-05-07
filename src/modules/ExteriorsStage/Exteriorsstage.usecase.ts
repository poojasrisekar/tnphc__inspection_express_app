import {
  createExteriorsStageDB,
  getAllExteriorsStageDB,
  getExteriorsStageByIdDB,
  updateExteriorsStageDB,
  deleteExteriorsStageDB
} from "./Exteriorsstage.service";

export const createExteriorsStageUsecase = async (
  body: any,
  files: any,
  req: any,
  userId?: string
) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const getFiles = (field: string) =>
    (files?.[field] || []).map((file: any) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`
    }));

  const isCompleted =
    body.isCompleted === "true" || body.isCompleted === true;

  if (isCompleted && (!files?.progressPhoto || files.progressPhoto.length === 0)) {
    throw new Error("progressPhoto is required when isCompleted is true");
  }

  if (!isCompleted && !body.progressRemarks) {
    throw new Error("progressRemarks is required when isCompleted is false");
  }

  const data = {
    projectId: body.projectId,

    block: body.block || null,
    floor: body.floor || null,
    stageOfWork: body.stageOfWork || null,

    isCompleted,
    progressRemarks: !isCompleted ? body.progressRemarks || null : null,
    progressPhoto: isCompleted ? getFiles("progressPhoto") : [],

    workStartedDate: body.workStartedDate ? new Date(body.workStartedDate) : null,

    isDelayed:
      body.isDelayed !== undefined
        ? body.isDelayed === "true" || body.isDelayed === true
        : null,
    delayDays: body.delayDays ? Number(body.delayDays) : null,
    delayReason: body.delayReason || null,
    delayOther: body.delayOther || null,

    // CEMENT
    cementGradeId: body.cementGradeId || null,
    cementBrandId: body.cementBrandId || null,
    cementRemarks: body.cementRemarks || null,
    cementLabTest: body.cementLabTest || null,
    cementPhoto: getFiles("cementPhoto"),

    // SAND
    sandType: body.sandType || null,
    sandLabTest: body.sandLabTest || null,
    sandPhoto: getFiles("sandPhoto"),
    sandSieveTestDone:
      body.sandSieveTestDone !== undefined
        ? body.sandSieveTestDone === "true" || body.sandSieveTestDone === true
        : null,
    sandSieveLabTest: body.sandSieveLabTest || null,
    sandSievePhoto: getFiles("sandSievePhoto"),

    // AGGREGATE
    aggregateSize: body.aggregateSize ? Number(body.aggregateSize) : null,
    aggregateLabTest: body.aggregateLabTest || null,
    aggregatePhoto: getFiles("aggregatePhoto"),

    // WATER
    waterLabTest: body.waterLabTest || null,
    waterPhoto: getFiles("waterPhoto"),

    // CONCRETE
    concreteLabTest: body.concreteLabTest || null,
    concretePhoto: getFiles("concretePhoto"),
    concreteQualityTestDone:
      body.concreteQualityTestDone !== undefined
        ? body.concreteQualityTestDone === "true" ||
          body.concreteQualityTestDone === true
        : null,
    concreteQualityLabTest: body.concreteQualityLabTest || null,
    concreteQualityPhoto: getFiles("concreteQualityPhoto"),

    // BRICKS
    bricksLabTest: body.bricksLabTest || null,
    bricksPhoto: getFiles("bricksPhoto"),
    bricksQualityTestDone:
      body.bricksQualityTestDone !== undefined
        ? body.bricksQualityTestDone === "true" ||
          body.bricksQualityTestDone === true
        : null,
    bricksQualityLabTest: body.bricksQualityLabTest || null,
    bricksQualityPhoto: getFiles("bricksQualityPhoto"),

    // PLASTERING
    plasteringTestDone:
      body.plasteringTestDone !== undefined
        ? body.plasteringTestDone === "true" || body.plasteringTestDone === true
        : null,
    plasteringLabTest: body.plasteringLabTest || null,
    plasteringPhoto: getFiles("plasteringPhoto"),
    plasteringRemarks: body.plasteringRemarks || null,

    // DOORS & WINDOWS
    doorWindowType: body.doorWindowType || null,
    upvcBrand: body.upvcBrand || null,
    glassBrand: body.glassBrand || null,
    glassThickness: body.glassThickness || null,
    doorWindowRemarks: body.doorWindowRemarks || null,

    // INTERIOR TILES
    interiorFloorType: body.interiorFloorType || null,
    interiorTileBrand: body.interiorTileBrand || null,
    interiorTileRemarks: body.interiorTileRemarks || null,

    // EXTERIOR ROOF TILES
    roofFloorType: body.roofFloorType || null,
    roofTileBrand: body.roofTileBrand || null,
    roofTileRemarks: body.roofTileRemarks || null,

    // INTERIOR PAINTING
    interiorPaintBrand: body.interiorPaintBrand || null,
    interiorPaintingQuality: body.interiorPaintingQuality || null,

    // EXTERIOR PAINTING
    exteriorPaintBrand: body.exteriorPaintBrand || null,
    exteriorPaintingQuality: body.exteriorPaintingQuality || null,

    qualityRemarks: body.qualityRemarks || null,

    createdById: userId
  };

  return createExteriorsStageDB(data);
};

export const getAllExteriorsStageUsecase = async (projectId: string) => {
  return getAllExteriorsStageDB(projectId);
};

export const getExteriorsStageByIdUsecase = async (
  projectId: string
) => {
  const data =
    await getExteriorsStageByIdDB(projectId);

  if (!data)
    throw new Error(
      "Exteriors stage record not found"
    );

  return data;
};

export const updateExteriorsStageUsecase = async (
  id: string,
  body: any,
  files: any,
  req: any,
  userId?: string
) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const getFiles = (field: string) =>
    (files?.[field] || []).map((file: any) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`
    }));

  const data: any = { updatedById: userId };

  if (body.block !== undefined) data.block = body.block;
  if (body.floor !== undefined) data.floor = body.floor;
  if (body.stageOfWork !== undefined) data.stageOfWork = body.stageOfWork;

  if (body.isCompleted !== undefined) {
    const isCompleted =
      body.isCompleted === "true" || body.isCompleted === true;
    data.isCompleted = isCompleted;

    if (isCompleted) {
      if (!files?.progressPhoto || files.progressPhoto.length === 0) {
        throw new Error("progressPhoto is required when isCompleted is true");
      }
      data.progressPhoto = getFiles("progressPhoto");
      data.progressRemarks = null;
    } else {
      if (!body.progressRemarks) {
        throw new Error("progressRemarks is required when isCompleted is false");
      }
      data.progressRemarks = body.progressRemarks;
      data.progressPhoto = [];
    }
  } else {
    const progressPhoto = getFiles("progressPhoto");
    if (progressPhoto.length > 0) data.progressPhoto = progressPhoto;
    if (body.progressRemarks !== undefined)
      data.progressRemarks = body.progressRemarks;
  }

  if (body.workStartedDate !== undefined)
    data.workStartedDate = body.workStartedDate
      ? new Date(body.workStartedDate)
      : null;

  if (body.isDelayed !== undefined)
    data.isDelayed = body.isDelayed === "true" || body.isDelayed === true;
  if (body.delayDays !== undefined) data.delayDays = Number(body.delayDays);
  if (body.delayReason !== undefined) data.delayReason = body.delayReason;
  if (body.delayOther !== undefined) data.delayOther = body.delayOther;

  // CEMENT
  if (body.cementGradeId !== undefined) data.cementGradeId = body.cementGradeId;
  if (body.cementBrandId !== undefined) data.cementBrandId = body.cementBrandId;
  if (body.cementRemarks !== undefined) data.cementRemarks = body.cementRemarks;
  if (body.cementLabTest !== undefined) data.cementLabTest = body.cementLabTest;
  const cementPhoto = getFiles("cementPhoto");
  if (cementPhoto.length > 0) data.cementPhoto = cementPhoto;

  // SAND
  if (body.sandType !== undefined) data.sandType = body.sandType;
  if (body.sandLabTest !== undefined) data.sandLabTest = body.sandLabTest;
  const sandPhoto = getFiles("sandPhoto");
  if (sandPhoto.length > 0) data.sandPhoto = sandPhoto;
  if (body.sandSieveTestDone !== undefined)
    data.sandSieveTestDone =
      body.sandSieveTestDone === "true" || body.sandSieveTestDone === true;
  if (body.sandSieveLabTest !== undefined)
    data.sandSieveLabTest = body.sandSieveLabTest;
  const sandSievePhoto = getFiles("sandSievePhoto");
  if (sandSievePhoto.length > 0) data.sandSievePhoto = sandSievePhoto;

  // AGGREGATE
  if (body.aggregateSize !== undefined)
    data.aggregateSize = Number(body.aggregateSize);
  if (body.aggregateLabTest !== undefined)
    data.aggregateLabTest = body.aggregateLabTest;
  const aggregatePhoto = getFiles("aggregatePhoto");
  if (aggregatePhoto.length > 0) data.aggregatePhoto = aggregatePhoto;

  // WATER
  if (body.waterLabTest !== undefined) data.waterLabTest = body.waterLabTest;
  const waterPhoto = getFiles("waterPhoto");
  if (waterPhoto.length > 0) data.waterPhoto = waterPhoto;

  // CONCRETE
  if (body.concreteLabTest !== undefined)
    data.concreteLabTest = body.concreteLabTest;
  const concretePhoto = getFiles("concretePhoto");
  if (concretePhoto.length > 0) data.concretePhoto = concretePhoto;
  if (body.concreteQualityTestDone !== undefined)
    data.concreteQualityTestDone =
      body.concreteQualityTestDone === "true" ||
      body.concreteQualityTestDone === true;
  if (body.concreteQualityLabTest !== undefined)
    data.concreteQualityLabTest = body.concreteQualityLabTest;
  const concreteQualityPhoto = getFiles("concreteQualityPhoto");
  if (concreteQualityPhoto.length > 0)
    data.concreteQualityPhoto = concreteQualityPhoto;

  // BRICKS
  if (body.bricksLabTest !== undefined) data.bricksLabTest = body.bricksLabTest;
  const bricksPhoto = getFiles("bricksPhoto");
  if (bricksPhoto.length > 0) data.bricksPhoto = bricksPhoto;
  if (body.bricksQualityTestDone !== undefined)
    data.bricksQualityTestDone =
      body.bricksQualityTestDone === "true" ||
      body.bricksQualityTestDone === true;
  if (body.bricksQualityLabTest !== undefined)
    data.bricksQualityLabTest = body.bricksQualityLabTest;
  const bricksQualityPhoto = getFiles("bricksQualityPhoto");
  if (bricksQualityPhoto.length > 0)
    data.bricksQualityPhoto = bricksQualityPhoto;

  // PLASTERING
  if (body.plasteringTestDone !== undefined)
    data.plasteringTestDone =
      body.plasteringTestDone === "true" || body.plasteringTestDone === true;
  if (body.plasteringLabTest !== undefined)
    data.plasteringLabTest = body.plasteringLabTest;
  const plasteringPhoto = getFiles("plasteringPhoto");
  if (plasteringPhoto.length > 0) data.plasteringPhoto = plasteringPhoto;
  if (body.plasteringRemarks !== undefined)
    data.plasteringRemarks = body.plasteringRemarks;

  // DOORS & WINDOWS
  if (body.doorWindowType !== undefined) data.doorWindowType = body.doorWindowType;
  if (body.upvcBrand !== undefined) data.upvcBrand = body.upvcBrand;
  if (body.glassBrand !== undefined) data.glassBrand = body.glassBrand;
  if (body.glassThickness !== undefined) data.glassThickness = body.glassThickness;
  if (body.doorWindowRemarks !== undefined) data.doorWindowRemarks = body.doorWindowRemarks;

  // INTERIOR TILES
  if (body.interiorFloorType !== undefined) data.interiorFloorType = body.interiorFloorType;
  if (body.interiorTileBrand !== undefined) data.interiorTileBrand = body.interiorTileBrand;
  if (body.interiorTileRemarks !== undefined) data.interiorTileRemarks = body.interiorTileRemarks;

  // EXTERIOR ROOF TILES
  if (body.roofFloorType !== undefined) data.roofFloorType = body.roofFloorType;
  if (body.roofTileBrand !== undefined) data.roofTileBrand = body.roofTileBrand;
  if (body.roofTileRemarks !== undefined) data.roofTileRemarks = body.roofTileRemarks;

  // INTERIOR PAINTING
  if (body.interiorPaintBrand !== undefined) data.interiorPaintBrand = body.interiorPaintBrand;
  if (body.interiorPaintingQuality !== undefined) data.interiorPaintingQuality = body.interiorPaintingQuality;

  // EXTERIOR PAINTING
  if (body.exteriorPaintBrand !== undefined) data.exteriorPaintBrand = body.exteriorPaintBrand;
  if (body.exteriorPaintingQuality !== undefined) data.exteriorPaintingQuality = body.exteriorPaintingQuality;

  if (body.qualityRemarks !== undefined)
    data.qualityRemarks = body.qualityRemarks;

  return updateExteriorsStageDB(id, data);
};

export const deleteExteriorsStageUsecase = async (id: string) => {
  return deleteExteriorsStageDB(id);
};