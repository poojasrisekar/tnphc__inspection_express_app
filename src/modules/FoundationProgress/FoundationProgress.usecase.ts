import {
  createFoundationProgressDB,
  getAllFoundationProgressDB,
  getFoundationProgressByIdDB,
  updateFoundationProgressDB,
  deleteFoundationProgressDB
} from "./FoundationProgress.service";

export const createFoundationProgressUsecase = async (
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

    // ENUM
    type: body.type,

    // COMMON NUMBERS
    total: body.total ? Number(body.total) : null,
    completed: body.completed ? Number(body.completed) : null,

    // PHOTOS
    photos: getFiles("photos"),

    // DATE
    workStartedDate: body.workStartedDate
      ? new Date(body.workStartedDate)
      : null,

    // DELAY
    isDelay: body.isDelay === "true" || body.isDelay === true,
    delayDays: body.delayDays ? Number(body.delayDays) : null,
    delayPhotos: getFiles("delayPhotos"),
    delayReason: body.delayReason || null,
    delayOtherReason: body.delayOtherReason || null,

    // REMARKS
    generalRemarks: body.generalRemarks || null,

    // RAFT ONLY
    raftType: body.raftType || null,

    createdById: userId
  };

  return createFoundationProgressDB(data);
};

export const getAllFoundationProgressUsecase = async (projectId: string) => {
  return getAllFoundationProgressDB(projectId);
};

export const getFoundationProgressByIdUsecase = async (id: string) => {
  const data = await getFoundationProgressByIdDB(id);
  if (!data) throw new Error("Foundation progress record not found");
  return data;
};

export const updateFoundationProgressUsecase = async (
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

  if (body.type !== undefined) data.type = body.type;
  if (body.total !== undefined) data.total = Number(body.total);
  if (body.completed !== undefined) data.completed = Number(body.completed);
  if (body.workStartedDate !== undefined)
    data.workStartedDate = new Date(body.workStartedDate);
  if (body.isDelay !== undefined)
    data.isDelay = body.isDelay === "true" || body.isDelay === true;
  if (body.delayDays !== undefined) data.delayDays = Number(body.delayDays);
  if (body.delayReason !== undefined) data.delayReason = body.delayReason;
  if (body.delayOtherReason !== undefined)
    data.delayOtherReason = body.delayOtherReason;
  if (body.generalRemarks !== undefined)
    data.generalRemarks = body.generalRemarks;
  if (body.raftType !== undefined) data.raftType = body.raftType;

  const photos = getFiles("photos");
  if (photos.length > 0) data.photos = photos;

  const delayPhotos = getFiles("delayPhotos");
  if (delayPhotos.length > 0) data.delayPhotos = delayPhotos;

  return updateFoundationProgressDB(id, data);
};

export const deleteFoundationProgressUsecase = async (id: string) => {
  return deleteFoundationProgressDB(id);
};