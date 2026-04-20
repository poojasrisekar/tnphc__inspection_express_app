import {
  createFoundationQualityCheckDB,
  getAllFoundationQualityCheckDB,
  getFoundationQualityCheckByIdDB,
  updateFoundationQualityCheckDB,
  deleteFoundationQualityCheckDB
} from "./FoundationQualityCheck.service";

export const createFoundationQualityCheckUsecase = async (
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

  const data = {
    projectId: body.projectId,

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

    // REMARKS
    remarks: body.remarks || null,

    createdById: userId
  };

  return createFoundationQualityCheckDB(data);
};

export const getAllFoundationQualityCheckUsecase = async (
  projectId: string
) => {
  return getAllFoundationQualityCheckDB(projectId);
};

export const getFoundationQualityCheckByIdUsecase = async (id: string) => {
  const data = await getFoundationQualityCheckByIdDB(id);
  if (!data) throw new Error("Foundation quality check record not found");
  return data;
};

export const updateFoundationQualityCheckUsecase = async (
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

  // REMARKS
  if (body.remarks !== undefined) data.remarks = body.remarks;

  return updateFoundationQualityCheckDB(id, data);
};

export const deleteFoundationQualityCheckUsecase = async (id: string) => {
  return deleteFoundationQualityCheckDB(id);
};