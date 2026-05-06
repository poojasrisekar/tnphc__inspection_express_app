import prisma from "../../shared/prisma";

const toNumber = (val: any) => {
  if (val === undefined || val === null || val === "") return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

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

    // ✅ boolean conversion
    isNearWaterBody: data.isNearWaterBody === "Yes",
  };

  // ✅ cleanup
  cleanField(parsed, data.isEncroachment === "Yes", ["encroachmentPercent", "encroachmentType"]);
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

// ✅ COMMON FILE FORMATTER
const mapFiles = (files: any[], baseUrl: string) => {
  return (
    files?.map((file) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`,
    })) || []
  );
};

// ✅ MULTI FILE HANDLER (NEW)
const handleAllPhotos = (files: any, baseUrl: string) => {
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
export const getAllInspectionService = (projectId: string) => {
  return prisma.landSiteInspection.findMany({
    where: { projectId, isActive: true },
  });
};

// ✅ GET ONE
export const getInspectionByIdService = (id: string) => {
  return prisma.landSiteInspection.findUnique({ where: { id } });
};

// ✅ DELETE
export const deleteInspectionService = (id: string) => {
  return prisma.landSiteInspection.update({
    where: { id },
    data: { isActive: false },
  });
};