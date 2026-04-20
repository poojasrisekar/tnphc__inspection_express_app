import {
  createPlinthStageDB,
  getAllPlinthStageDB,
  getPlinthStageByIdDB,
  updatePlinthStageDB,
  deletePlinthStageDB
} from "./PlinthStage.service";

export const createPlinthStageUsecase = async (
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

  // Guard: isCompleted=true requires progressPhoto
  if (isCompleted && (!files?.progressPhoto || files.progressPhoto.length === 0)) {
    throw new Error("progressPhoto is required when isCompleted is true");
  }

  // Guard: isCompleted=false requires progressRemarks
  if (!isCompleted && !body.progressRemarks) {
    throw new Error("progressRemarks is required when isCompleted is false");
  }

  const data = {
    projectId: body.projectId,
    stageOfWork: body.stageOfWork || null,

    isCompleted,
    progressRemarks: !isCompleted ? body.progressRemarks || null : null,
    progressPhoto: isCompleted ? getFiles("progressPhoto") : [],

    workStartedDate: body.workStartedDate ? new Date(body.workStartedDate) : null,

    isDelay:
      body.isDelay !== undefined
        ? body.isDelay === "true" || body.isDelay === true
        : null,
    delayDays: body.delayDays ? Number(body.delayDays) : null,
    delayReason: body.delayReason || null,
    delayOtherReason: body.delayOtherReason || null,

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

    // STEEL
    steelGradeId: body.steelGradeId || null,
    steelBrandId: body.steelBrandId || null,
    steelLabTest: body.steelLabTest || null,
    steelPhoto: getFiles("steelPhoto"),

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

    qualityRemarks: body.qualityRemarks || null,

    createdById: userId
  };

  return createPlinthStageDB(data);
};

export const getAllPlinthStageUsecase = async (projectId: string) => {
  return getAllPlinthStageDB(projectId);
};

export const getPlinthStageByIdUsecase = async (id: string) => {
  const data = await getPlinthStageByIdDB(id);
  if (!data) throw new Error("Plinth stage record not found");
  return data;
};

export const updatePlinthStageUsecase = async (
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

  if (body.stageOfWork !== undefined) data.stageOfWork = body.stageOfWork;

  if (body.isCompleted !== undefined) {
    const isCompleted =
      body.isCompleted === "true" || body.isCompleted === true;
    data.isCompleted = isCompleted;

    if (isCompleted) {
      // When marking complete, photo required
      if (!files?.progressPhoto || files.progressPhoto.length === 0) {
        throw new Error("progressPhoto is required when isCompleted is true");
      }
      data.progressPhoto = getFiles("progressPhoto");
      data.progressRemarks = null; // clear remarks
    } else {
      // When marking incomplete, remarks required
      if (!body.progressRemarks) {
        throw new Error("progressRemarks is required when isCompleted is false");
      }
      data.progressRemarks = body.progressRemarks;
      data.progressPhoto = []; // clear photo
    }
  } else {
    // isCompleted not being changed — allow partial photo/remarks update
    const progressPhoto = getFiles("progressPhoto");
    if (progressPhoto.length > 0) data.progressPhoto = progressPhoto;
    if (body.progressRemarks !== undefined)
      data.progressRemarks = body.progressRemarks;
  }

  if (body.workStartedDate !== undefined)
    data.workStartedDate = body.workStartedDate
      ? new Date(body.workStartedDate)
      : null;

  if (body.isDelay !== undefined)
    data.isDelay = body.isDelay === "true" || body.isDelay === true;
  if (body.delayDays !== undefined) data.delayDays = Number(body.delayDays);
  if (body.delayReason !== undefined) data.delayReason = body.delayReason;
  if (body.delayOtherReason !== undefined)
    data.delayOtherReason = body.delayOtherReason;

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

  // STEEL
  if (body.steelGradeId !== undefined) data.steelGradeId = body.steelGradeId;
  if (body.steelBrandId !== undefined) data.steelBrandId = body.steelBrandId;
  if (body.steelLabTest !== undefined) data.steelLabTest = body.steelLabTest;
  const steelPhoto = getFiles("steelPhoto");
  if (steelPhoto.length > 0) data.steelPhoto = steelPhoto;

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

  if (body.qualityRemarks !== undefined)
    data.qualityRemarks = body.qualityRemarks;

  return updatePlinthStageDB(id, data);
};

export const deletePlinthStageUsecase = async (id: string) => {
  return deletePlinthStageDB(id);
};