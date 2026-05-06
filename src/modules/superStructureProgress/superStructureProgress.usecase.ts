import {
  getSuperStructureFullViewService,
  upsertProgressDB,
  deleteProgressDB,
  upsertQualityDB,
  getProgressByProjectService,
  getQualityByProjectService
} from "./superStructureProgress.service";

// 🔹 GET
export const getSuperStructureFullViewUsecase = async (projectId: string) => {
  return getSuperStructureFullViewService(projectId);
};

// 🔹 CREATE / UPDATE PROGRESS
export const createProgressUsecase = async (body: any, files: any, req: any) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const photo =
    (files?.photo || []).map((f: any) => ({
      fileName: f.filename,
      url: `${baseUrl}/uploads/${f.filename}`
    })) || [];

  return upsertProgressDB({
    projectId: body.projectId,
    blockName: body.blockName,
    floorName: body.floorName,
    stage: body.stage,
    photo,
    status: "IN_PROGRESS"
  });
};

// 🔹 DELETE
export const deleteProgressUsecase = async (id: string) => {
  return deleteProgressDB(id);
};

// 🔹 QUALITY
export const createQualityUsecase = async (body: any, files: any, req: any) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const getFiles = (key: string) =>
    (files?.[key] || []).map((f: any) => ({
      fileName: f.filename,
      url: `${baseUrl}/uploads/${f.filename}`
    }));

  return upsertQualityDB({
    projectId: body.projectId,

    workStartedDate: body.workStartedDate
      ? new Date(body.workStartedDate)
      : null,

    isDelay: body.isDelay === "true" || body.isDelay === true,
    delayDays: body.delayDays ? Number(body.delayDays) : null,

    delayReason: body.delayReason,
    delayOtherReason: body.delayOtherReason,

    cementGradeId: body.cementGradeId,
    cementBrandId: body.cementBrandId,
    cementRemarks: body.cementRemarks,
    cementLabTest: body.cementLabTest,
    cementPhoto: getFiles("cementPhoto"),

    sandType: body.sandType,
    sandLabTest: body.sandLabTest,
    sandPhoto: getFiles("sandPhoto"),

    steelGradeId: body.steelGradeId,
    steelBrandId: body.steelBrandId,
    steelLabTest: body.steelLabTest,
    steelPhoto: getFiles("steelPhoto"),

    aggregateSize: body.aggregateSize
      ? Number(body.aggregateSize)
      : null,
    aggregateLabTest: body.aggregateLabTest,
    aggregatePhoto: getFiles("aggregatePhoto"),

    waterLabTest: body.waterLabTest,
    waterPhoto: getFiles("waterPhoto"),

    concreteLabTest: body.concreteLabTest,
    concretePhoto: getFiles("concretePhoto"),
    concreteQualityTestDone:
      body.concreteQualityTestDone === "true",
    concreteQualityLabTest: body.concreteQualityLabTest,
    concreteQualityPhoto: getFiles("concreteQualityPhoto"),

    bricksLabTest: body.bricksLabTest,
    bricksPhoto: getFiles("bricksPhoto"),
    bricksQualityTestDone: body.bricksQualityTestDone === "true",
    bricksQualityLabTest: body.bricksQualityLabTest,
    bricksQualityPhoto: getFiles("bricksQualityPhoto"),

    qualityRemarks: body.qualityRemarks
  });
};


export const getProgressByProjectUsecase =
  async (projectId: string) => {
    return getProgressByProjectService(projectId);
  };

export const getQualityByProjectUsecase =
  async (projectId: string) => {
    return getQualityByProjectService(projectId);
  };