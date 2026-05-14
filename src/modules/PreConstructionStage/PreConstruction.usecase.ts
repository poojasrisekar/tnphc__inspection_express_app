import {
  createPreConstructionDB,
  getAllPreConstructionDB,
  getPreConstructionByIdDB,
  updatePreConstructionDB,
  deletePreConstructionDB,
  getPreConstructionByInspectionIdDB
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

export const getPreConstructionByIdUsecase = async (
  projectId: string
) => {
  const data =
    await getPreConstructionByIdDB(projectId);

  if (!data)
    throw new Error("Not found");

  return data;
};

 
export const updatePreConstructionUsecase = async (
  id: string,
  body: any,
  files: any,
  req: any,
  userId?: string
) => {

  // CHECK RECORD EXISTS
  const existing =
    await getPreConstructionByInspectionIdDB(id);

  if (!existing) {
    throw new Error("PreConstruction record not found");
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const getFiles = (field: string) => {
    return (files?.[field] || []).map((file: any) => ({
      fileName: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`
    }));
  };

  // UPDATE DATA
  const data: Record<string, any> = {};

  // YES / NO FIELDS
  if (body.isPermissionObtained !== undefined)
    data.isPermissionObtained =
      body.isPermissionObtained;

  if (body.isSiteCleared !== undefined)
    data.isSiteCleared =
      body.isSiteCleared;

  if (body.hasLabourShed !== undefined)
    data.hasLabourShed =
      body.hasLabourShed;

  if (body.hasWaterSupply !== undefined)
    data.hasWaterSupply =
      body.hasWaterSupply;

  if (body.hasToiletFacility !== undefined)
    data.hasToiletFacility =
      body.hasToiletFacility;

  if (body.hasElectricity !== undefined)
    data.hasElectricity =
      body.hasElectricity;

  if (body.hasMaterialStorage !== undefined)
    data.hasMaterialStorage =
      body.hasMaterialStorage;

  if (body.hasTempElectricity !== undefined)
    data.hasTempElectricity =
      body.hasTempElectricity;

  if (body.isAccessRoadGood !== undefined)
    data.isAccessRoadGood =
      body.isAccessRoadGood;

  // DATE
  if (body.permissionDate !== undefined)
    data.permissionDate = body.permissionDate
      ? new Date(body.permissionDate)
      : null;

  // STRING FIELDS
  if (body.siteDetails !== undefined)
    data.siteDetails =
      body.siteDetails || null;

  if (body.labourShedType !== undefined)
    data.labourShedType =
      body.labourShedType || null;

  if (body.materialType !== undefined)
    data.materialType =
      body.materialType || null;

  if (body.waterType !== undefined)
    data.waterType =
      body.waterType || null;

  if (body.remarks !== undefined)
    data.remarks =
      body.remarks || null;

  // NUMBER FIELDS
  if (body.labourShedArea !== undefined)
    data.labourShedArea =
      body.labourShedArea
        ? Number(body.labourShedArea)
        : null;

  if (body.labourCount !== undefined)
    data.labourCount =
      body.labourCount
        ? Number(body.labourCount)
        : null;

  // FILES
  const waterSupplyPhotos =
    getFiles("waterSupplyPhotos");

  if (waterSupplyPhotos.length > 0)
    data.waterSupplyPhotos =
      waterSupplyPhotos;

  const toiletPhotos =
    getFiles("toiletPhotos");

  if (toiletPhotos.length > 0)
    data.toiletPhotos =
      toiletPhotos;

  const electricityPhotos =
    getFiles("electricityPhotos");

  if (electricityPhotos.length > 0)
    data.electricityPhotos =
      electricityPhotos;

  const labourPhotos =
    getFiles("labourPhotos");

  if (labourPhotos.length > 0)
    data.labourPhotos =
      labourPhotos;

  const materialPhotos =
    getFiles("materialPhotos");

  if (materialPhotos.length > 0)
    data.materialPhotos =
      materialPhotos;

  const accessRoadPhotos =
    getFiles("accessRoadPhotos");

  if (accessRoadPhotos.length > 0)
    data.accessRoadPhotos =
      accessRoadPhotos;

  // FINAL UPDATE
  return updatePreConstructionDB(id, data);
};

export const deletePreConstructionUsecase = async (id: string) => {
  return deletePreConstructionDB(id);
};