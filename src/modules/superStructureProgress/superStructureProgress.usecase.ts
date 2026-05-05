import {
  getSuperStructureProgressViewService,
  createSuperStructureProgressDB,
  updateSuperStructureProgressDB
} from "./superStructureProgress.service";

// ✅ GET
export const getSuperStructureProgressViewUsecase = async (
  projectId: string
) => {
  return getSuperStructureProgressViewService(projectId);
};

export const createSuperStructureProgressUsecase = async (
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

  // ✅ 🔥 PARSE floorsProgress JSON
  let parsedFloors: any[] = [];

  if (body.floorsProgress) {
    try {
      parsedFloors =
        typeof body.floorsProgress === "string"
          ? JSON.parse(body.floorsProgress)
          : body.floorsProgress;
    } catch (err) {
      throw new Error("Invalid floorsProgress JSON");
    }
  }

  // ✅ 🔥 MAP FLOOR-WISE PHOTOS
  const floorsProgress = parsedFloors.map((floor: any) => {
    const photos = getFiles(floor.photoKey); // dynamic field

    return {
      floorName: floor.floorName,
      photos
    };
  });

  // ✅ AUTO STATUS LOGIC (optional but recommended)
  let status = body.status || "NOT_STARTED";

  if (body.currentFloor && parsedFloors.length > 0) {
    status =
      parsedFloors.length === body.currentFloor
        ? "COMPLETED"
        : "IN_PROGRESS";
  }

  const data = {
    projectId: body.projectId,
    blockName: body.blockName,

    currentFloor: body.currentFloor
      ? Number(body.currentFloor)
      : 0,

    status,

    // ❌ OLD (keep if needed)
    superStructurePhoto: getFiles("superStructurePhoto"),

    // ✅ NEW FLOOR-WISE STORAGE
    floorsProgress,

    workStartedDate: body.workStartedDate
      ? new Date(body.workStartedDate)
      : null,

    isDelay:
      body.isDelay !== undefined
        ? body.isDelay === "true" || body.isDelay === true
        : null,

    delayDays: body.delayDays ? Number(body.delayDays) : null,
    delayReason: body.delayReason || null,
    delayOtherReason: body.delayOtherReason || null,

    // MATERIALS
    cementGradeId: body.cementGradeId || null,
    cementBrandId: body.cementBrandId || null,
    cementRemarks: body.cementRemarks || null,
    cementLabTest: body.cementLabTest || null,
    cementPhoto: getFiles("cementPhoto"),

    sandType: body.sandType || null,
    sandLabTest: body.sandLabTest || null,
    sandPhoto: getFiles("sandPhoto"),

    steelGradeId: body.steelGradeId || null,
    steelBrandId: body.steelBrandId || null,
    steelLabTest: body.steelLabTest || null,
    steelPhoto: getFiles("steelPhoto"),

    aggregateSize: body.aggregateSize
      ? Number(body.aggregateSize)
      : null,
    aggregateLabTest: body.aggregateLabTest || null,
    aggregatePhoto: getFiles("aggregatePhoto"),

    waterLabTest: body.waterLabTest || null,
    waterPhoto: getFiles("waterPhoto"),

    concreteLabTest: body.concreteLabTest || null,
    concretePhoto: getFiles("concretePhoto"),

    bricksLabTest: body.bricksLabTest || null,
    bricksPhoto: getFiles("bricksPhoto"),

    qualityRemarks: body.qualityRemarks || null,

    createdById: userId
  };

  return createSuperStructureProgressDB(data);
};

// ✅ UPDATE
export const updateSuperStructureProgressUsecase = async (
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

  const data: any = {
    updatedById: userId
  };

  if (body.currentFloor !== undefined)
    data.currentFloor = Number(body.currentFloor);

  if (body.status !== undefined)
    data.status = body.status;

  if (body.workStartedDate !== undefined)
    data.workStartedDate = body.workStartedDate
      ? new Date(body.workStartedDate)
      : null;

  if (body.isDelay !== undefined)
    data.isDelay = body.isDelay === "true" || body.isDelay === true;

  if (body.delayDays !== undefined)
    data.delayDays = Number(body.delayDays);

  if (body.delayReason !== undefined)
    data.delayReason = body.delayReason;

  if (body.delayOtherReason !== undefined)
    data.delayOtherReason = body.delayOtherReason;

  // FILES
  const superPhotos = getFiles("superStructurePhoto");
  if (superPhotos.length > 0)
    data.superStructurePhoto = superPhotos;

  const cementPhoto = getFiles("cementPhoto");
  if (cementPhoto.length > 0) data.cementPhoto = cementPhoto;

  const sandPhoto = getFiles("sandPhoto");
  if (sandPhoto.length > 0) data.sandPhoto = sandPhoto;

  const steelPhoto = getFiles("steelPhoto");
  if (steelPhoto.length > 0) data.steelPhoto = steelPhoto;

  const aggregatePhoto = getFiles("aggregatePhoto");
  if (aggregatePhoto.length > 0)
    data.aggregatePhoto = aggregatePhoto;

  const waterPhoto = getFiles("waterPhoto");
  if (waterPhoto.length > 0) data.waterPhoto = waterPhoto;

  const concretePhoto = getFiles("concretePhoto");
  if (concretePhoto.length > 0)
    data.concretePhoto = concretePhoto;

  const bricksPhoto = getFiles("bricksPhoto");
  if (bricksPhoto.length > 0) data.bricksPhoto = bricksPhoto;

  return updateSuperStructureProgressDB(id, data);
};