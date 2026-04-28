import {
  createPreConstructionDB,
  getAllPreConstructionDB,
  getPreConstructionByIdDB,
  updatePreConstructionDB,
  deletePreConstructionDB
} from "./PreConstruction.service";

export const createPreConstructionUsecase = async (
  body: any,
  files: any,
  req: any,
  userId?: string
) => {

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const getFiles = (field: string) => {
    return (files?.[field] || []).map((file: any) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`
    }));
  };
  if(body.projectId === undefined){
    throw Error("Project Id Not Found");
  }
  const data = {
    projectId: body.projectId,

    // YES/NO
    isPermissionObtained: body.isPermissionObtained,
    isSiteCleared: body.isSiteCleared,
    hasLabourShed: body.hasLabourShed,
    hasWaterSupply: body.hasWaterSupply,
    hasToiletFacility: body.hasToiletFacility,
    hasElectricity: body.hasElectricity,
    hasMaterialStorage: body.hasMaterialStorage,
    hasTempElectricity: body.hasTempElectricity,
    isAccessRoadGood: body.isAccessRoadGood,

    // DATE
    permissionDate: body.permissionDate
      ? new Date(body.permissionDate)
      : null,

    // STRINGS
    siteDetails: body.siteDetails || null,
    labourShedType: body.labourShedType || null,
    materialType: body.materialType || null,
    waterType: body.waterType || null,
    remarks: body.remarks || null,

    // NUMBERS
    labourShedArea: body.labourShedArea ? Number(body.labourShedArea) : null,
    labourCount: body.labourCount ? Number(body.labourCount) : null,

    // FILES
    waterSupplyPhotos: getFiles("waterSupplyPhotos"),
    toiletPhotos: getFiles("toiletPhotos"),
    electricityPhotos: getFiles("electricityPhotos"),
    labourPhotos: getFiles("labourPhotos"),
    materialPhotos: getFiles("materialPhotos"),
    accessRoadPhotos: getFiles("accessRoadPhotos"),

    createdById: userId
  };

  return createPreConstructionDB(data);
};

export const getAllPreConstructionUsecase = async (projectId: string) => {
  return getAllPreConstructionDB(projectId);
};

export const getPreConstructionByIdUsecase = async (id: string) => {
  const data = await getPreConstructionByIdDB(id);
  if (!data) throw new Error("Not found");
  return data;
};

export const updatePreConstructionUsecase = async (id: string, data: any) => {
  return updatePreConstructionDB(id, data);
};

export const deletePreConstructionUsecase = async (id: string) => {
  return deletePreConstructionDB(id);
};