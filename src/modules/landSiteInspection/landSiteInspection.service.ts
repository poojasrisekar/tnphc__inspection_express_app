import prisma from "../../shared/prisma";

const toNumber = (val: any) => {
  if (val === undefined || val === null || val === "") return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

// ✅ Delete sub-fields when parent flag is NOT "Yes"
const cleanField = (obj: any, condition: boolean, fields: string[]) => {
  if (!condition) {
    fields.forEach((f) => delete obj[f]);
  }
};

const parseInspectionData = (data: any) => {
  const parsed: any = {
    ...data,

    // ✅ numbers
    encroachmentPercent: toNumber(data.encroachmentPercent),
    waterDepth: toNumber(data.waterDepth),
    waterDurationDays: toNumber(data.waterDurationDays),
    treesCount: toNumber(data.treesCount),
    monumentDistance: toNumber(data.monumentDistance),
    seaDistance: toNumber(data.seaDistance),
    forestDistance: toNumber(data.forestDistance),
    waterBodyDistance: toNumber(data.waterBodyDistance),
    burialDistance: toNumber(data.burialDistance),
    roadWidth: toNumber(data.roadWidth),
    serviceDistance: toNumber(data.serviceDistance),

    // ✅ boolean conversion (Prisma stores this as Boolean, not YesNo enum)
    isNearWaterBody: data.isNearWaterBody === "Yes",
  };

  // ✅ Cleanup sub-fields when parent flag is NOT "Yes"
  cleanField(parsed, data.isEncroachment === "Yes", [
    "encroachmentPercent",
    "encroachmentType",
    "personEncroachingName",
  ]);
  cleanField(parsed, data.isCourtCase === "Yes", ["caseDetails"]);
  cleanField(parsed, data.hasStructure === "Yes", ["structureDetails"]);
  cleanField(parsed, data.isLowLying === "Yes", ["waterDepth", "waterDurationDays"]);
  cleanField(parsed, data.hasPowerLines === "Yes", ["powerLineDetails"]);
  cleanField(parsed, data.isNearMonument === "Yes", ["monumentName", "monumentDistance"]);
  cleanField(parsed, data.isNearSea === "Yes", ["seaDistance"]);
  cleanField(parsed, data.isNearForest === "Yes", ["forestName", "forestDistance"]);
  cleanField(parsed, data.isNearWaterBody === "Yes", ["waterBodyName", "waterBodyDistance"]);
  cleanField(parsed, data.isNearBurial === "Yes", ["burialName", "burialDistance"]);

  return parsed;
};

// ✅ FILE FORMATTER
const mapFiles = (files: Express.Multer.File[], baseUrl: string) => {
  return (
    files?.map((file) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`,
    })) || []
  );
};

// ✅ CONVERT upload.any() ARRAY → named groups object
// upload.any() returns: req.files = [{ fieldname: "encroachmentPhotos", ... }, ...]
// We need:             { encroachmentPhotos: [...], structurePhotos: [...], ... }
const groupFilesByFieldname = (
  files: Express.Multer.File[]
): { [fieldname: string]: Express.Multer.File[] } => {
  const grouped: { [fieldname: string]: Express.Multer.File[] } = {};
  if (!files || !Array.isArray(files)) return grouped;

  for (const file of files) {
    if (!grouped[file.fieldname]) {
      grouped[file.fieldname] = [];
    }
    grouped[file.fieldname].push(file);
  }
  return grouped;
};

// ✅ MULTI FILE HANDLER
const handleAllPhotos = (
  rawFiles: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] },
  baseUrl: string
) => {
  // Support both upload.any() (array) and upload.fields() (object) formats
  const files = Array.isArray(rawFiles)
    ? groupFilesByFieldname(rawFiles)
    : rawFiles;

  return {
    encroachmentPhotos: mapFiles(files?.encroachmentPhotos, baseUrl),
    structurePhotos: mapFiles(files?.structurePhotos, baseUrl),
    drainagePhotos: mapFiles(files?.drainagePhotos, baseUrl),
    treesPhoto: mapFiles(files?.treesPhoto, baseUrl),
    powerLinePhotos: mapFiles(files?.powerLinePhotos, baseUrl),
    monumentPhotos: mapFiles(files?.monumentPhotos, baseUrl),
    seaPhotos: mapFiles(files?.seaPhotos, baseUrl),
    forestPhotos: mapFiles(files?.forestPhotos, baseUrl),
    waterBodyPhotos: mapFiles(files?.waterBodyPhotos, baseUrl),
    burialPhotos: mapFiles(files?.burialPhotos, baseUrl),
  };
};

// ✅ CREATE
export const createInspectionService = async (
  body: any,
  files: any,
  userId: string,
  baseUrl: string
) => {
  // ✅ Validate project exists before inserting
  const projectExists = await prisma.project.findUnique({
    where: { id: body.projectId },
  });

  if (!projectExists) {
    throw new Error(`Project with id "${body.projectId}" does not exist.`);
  }

  const parsed = parseInspectionData(body);

  const photos = handleAllPhotos(files, baseUrl);
  Object.assign(parsed, photos);

  parsed.createdById = userId;

  return prisma.landSiteInspection.create({
    data: parsed,
  });
};

// ✅ UPDATE
export const updateInspectionService = async (
  id: string,
  body: any,
  files: any,
  baseUrl: string
) => {
  // ✅ Validate project exists before updating
  const projectExists = await prisma.project.findUnique({
    where: { id: body.projectId },
  });

  if (!projectExists) {
    throw new Error(`Project with id "${body.projectId}" does not exist.`);
  }

  const parsed = parseInspectionData(body);

  if (files) {
    const photos = handleAllPhotos(files, baseUrl);
    Object.assign(parsed, photos);
  }

  return prisma.landSiteInspection.update({
    where: { id },
    data: parsed,
  });
};

// ✅ GET ALL
export const getAllInspectionService = (
  projectId?: string
) => {
  return prisma.landSiteInspection.findMany({
    where: {
      isActive: true,
      ...(projectId ? { projectId } : {}),
    },
  });
};

// ✅ GET ONE
export const getInspectionByIdService = (
  projectId: string
) => {
  return prisma.landSiteInspection.findFirst({
    where: {
      projectId,
      isActive: true,
    },
  });
};

// ✅ DELETE
export const deleteInspectionService = (id: string) => {
  return prisma.landSiteInspection.update({
    where: { id },
    data: { isActive: false },
  });
};