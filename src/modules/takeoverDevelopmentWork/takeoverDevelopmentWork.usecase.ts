import {
  createTakeoverDevelopmentWorkDB,
  getAllTakeoverDevelopmentWorkDB,
  getTakeoverDevelopmentWorkByIdDB,
  getTakeoverDevelopmentWorkByProjectIdDB,
  updateTakeoverDevelopmentWorkDB,
  deleteTakeoverDevelopmentWorkDB
} from "./TakeoverDevelopmentWork.service";

// SAME helper
const toBool = (val: any): boolean | null => {
  if (val === undefined || val === null) return null;
  if (val === true || val === false) return val;
  if (val === "true" || val === "yes" || val === "1") return true;
  if (val === "false" || val === "no" || val === "0") return false;
  return null;
};

// CREATE (FULL SAME LOGIC)
export const createTakeoverDevelopmentWorkUsecase = async (
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

    // ✅ EXACT SAME BLOCKS
    sumpPump: {
      completionPercentage: body.completionPercentage || null,

      sumpCapacity: toBool(body.sumpCapacity)
        ? { value: true, remarks: body.sumpCapacityRemarks || null, photos: getFiles("sumpCapacityPhotos") }
        : { value: false },

      sumpQuality: toBool(body.sumpQuality)
        ? { value: true, remarks: body.sumpQualityRemarks || null, photos: getFiles("sumpQualityPhotos") }
        : { value: false },

      pumpsAsPerSpec: toBool(body.pumpsAsPerSpec)
        ? { value: true, remarks: body.pumpsSpecRemarks || null, photos: getFiles("pumpsSpecPhotos") }
        : { value: false },

      standbyPumps: toBool(body.standbyPumps)
        ? { value: true, remarks: body.standbyPumpsRemarks || null, photos: getFiles("standbyPumpsPhotos") }
        : { value: false },

      pumpsWorking: toBool(body.pumpsWorking)
        ? { value: true, remarks: body.pumpsWorkingRemarks || null, photos: getFiles("pumpsWorkingPhotos") }
        : { value: false },
    },

    borewell: {
      completionPercentage: body.borewellCompletionPercentage || null,
      depth: body.borewellDepth || null,

      isWorking: toBool(body.borewellWorking)
        ? { value: true, remarks: body.borewellRemarks || null, photos: getFiles("borewellPhotos") }
        : { value: false },

      waterQuality: body.waterQuality || null,
      labReport: getFiles("borewellLabReport"),
    },

    inspectionChamber: {
      completionPercentage: body.inspectionChamberCompletionPercentage || null,
      isProper: toBool(body.inspectionChamberProper)
        ? { value: true, remarks: body.inspectionChamberRemarks || null }
        : { value: false },
    },

    stormWaterDrains: {
      completionPercentage: body.stormWaterCompletionPercentage || null,
      isProper: toBool(body.stormWaterDrainsProper)
        ? { value: true, remarks: body.stormWaterDrainsRemarks || null }
        : { value: false },
    },

    sullageDrain: {
      completionPercentage: body.sullageDrainCompletionPercentage || null,
      isProper: toBool(body.sullageDrainProper)
        ? { value: true, remarks: body.sullageDrainRemarks || null }
        : { value: false },
    },

    road: body.roadType
      ? {
          roadType: body.roadType,
          quality: body.roadQuality || null,
          photos: getFiles("roadPhotos"),
        }
      : null,

    paverBlock: {
      completionPercentage: body.paverBlockCompletionPercentage || null,
      isProper: toBool(body.paverBlockProper)
        ? { value: true, remarks: body.paverBlockRemarks || null }
        : { value: false },
    },

    compoundWall: {
      quality: toBool(body.compoundWallQuality)
        ? { value: true, remarks: body.compoundWallQualityRemarks || null, photos: getFiles("compoundWallQualityPhotos") }
        : { value: false },

      expansionJoints: toBool(body.compoundWallExpansionJoints)
        ? { value: true, remarks: body.compoundWallExpansionRemarks || null, photos: getFiles("compoundWallExpansionPhotos") }
        : { value: false },

      airVents: toBool(body.compoundWallAirVents)
        ? { value: true, remarks: body.compoundWallAirVentsRemarks || null, photos: getFiles("compoundWallAirVentsPhotos") }
        : { value: false },
    },

    rainWaterHarvesting: {
      completionPercentage: body.rainWaterCompletionPercentage || null,
      numberOfPits: body.rainWaterPits || null,
      isProper: toBool(body.rainWaterProper)
        ? { value: true, remarks: body.rainWaterRemarks || null }
        : { value: false },
    },

    landScaping: {
      completionPercentage: body.landScapingCompletionPercentage || null,
      isProper: toBool(body.landScapingProper)
        ? { value: true, remarks: body.landScapingRemarks || null }
        : { value: false },
    },

    otherDefects: {
      description: body.otherDefectsDescription || null,
      category: body.otherDefectsCategory || null,
      location: body.otherDefectsLocation || null,
      photos: getFiles("otherDefectsPhotos"),
    },

    generalRemarks: {
      remarks: body.generalRemarks || null,
    },

    createdById: userId
  };

  return createTakeoverDevelopmentWorkDB(data);
};

// GET / UPDATE / DELETE → SAME
export const getAllTakeoverDevelopmentWorkUsecase = async (projectId: string) => {
  return getAllTakeoverDevelopmentWorkDB(projectId);
};

export const getTakeoverDevelopmentWorkByIdUsecase = async (id: string) => {
  const data = await getTakeoverDevelopmentWorkByIdDB(id);
  if (!data) throw new Error("Takeover development work not found");
  return data;
};

export const updateTakeoverDevelopmentWorkUsecase = async (id: string, body: any, files: any, req: any, userId?: string) => {

     const baseUrl = `${req.protocol}://${req.get("host")}`;
    
      const getFiles = (field: string) =>
        (files?.[field] || []).map((file: any) => ({
          fileName: file.filename,
          url: `${baseUrl}/uploads/${file.filename}`
        }));
    
      const hasAny = (...keys: string[]) => keys.some(k => body[k] !== undefined);
      const hasFiles = (...fields: string[]) => fields.some(f => (files?.[f] || []).length > 0);
    
      const data: any = { updatedById: userId };
    
      // SUMP & PUMP ROOM
      if (
        hasAny(
          "completionPercentage",
          "sumpCapacity", "sumpCapacityRemarks",
          "sumpQuality", "sumpQualityRemarks",
          "pumpsAsPerSpec", "pumpsSpecRemarks",
          "standbyPumps", "standbyPumpsRemarks",
          "pumpsWorking", "pumpsWorkingRemarks"
        ) ||
        hasFiles("sumpCapacityPhotos", "sumpQualityPhotos", "pumpsSpecPhotos", "standbyPumpsPhotos", "pumpsWorkingPhotos")
      ) {
        data.sumpPump = {
          ...(body.completionPercentage !== undefined && {
            completionPercentage: body.completionPercentage || null
          }),
    
          ...(body.sumpCapacity !== undefined && {
            sumpCapacity: toBool(body.sumpCapacity)
              ? {
                  value: true,
                  remarks: body.sumpCapacityRemarks || null,
                  photos: getFiles("sumpCapacityPhotos")
                }
              : { value: false }
          }),
    
          ...(body.sumpQuality !== undefined && {
            sumpQuality: toBool(body.sumpQuality)
              ? {
                  value: true,
                  remarks: body.sumpQualityRemarks || null,
                  photos: getFiles("sumpQualityPhotos")
                }
              : { value: false }
          }),
    
          ...(body.pumpsAsPerSpec !== undefined && {
            pumpsAsPerSpec: toBool(body.pumpsAsPerSpec)
              ? {
                  value: true,
                  remarks: body.pumpsSpecRemarks || null,
                  photos: getFiles("pumpsSpecPhotos")
                }
              : { value: false }
          }),
    
          ...(body.standbyPumps !== undefined && {
            standbyPumps: toBool(body.standbyPumps)
              ? {
                  value: true,
                  remarks: body.standbyPumpsRemarks || null,
                  photos: getFiles("standbyPumpsPhotos")
                }
              : { value: false }
          }),
    
          ...(body.pumpsWorking !== undefined && {
            pumpsWorking: toBool(body.pumpsWorking)
              ? {
                  value: true,
                  remarks: body.pumpsWorkingRemarks || null,
                  photos: getFiles("pumpsWorkingPhotos")
                }
              : { value: false }
          })
        };
      }
    
      // BOREWELL
      if (
        hasAny(
          "borewellCompletionPercentage",
          "borewellDepth",
          "borewellWorking", "borewellRemarks",
          "waterQuality"
        ) ||
        hasFiles("borewellPhotos", "borewellLabReport")
      ) {
        data.borewell = {
          ...(body.borewellCompletionPercentage !== undefined && {
            completionPercentage: body.borewellCompletionPercentage || null
          }),
          ...(body.borewellDepth !== undefined && {
            depth: body.borewellDepth || null
          }),
          ...(body.borewellWorking !== undefined && {
            isWorking: toBool(body.borewellWorking)
              ? {
                  value: true,
                  remarks: body.borewellRemarks || null,
                  photos: getFiles("borewellPhotos")
                }
              : { value: false }
          }),
          ...(body.waterQuality !== undefined && {
            waterQuality: body.waterQuality || null
          }),
          ...(hasFiles("borewellLabReport") && {
            labReport: getFiles("borewellLabReport")
          })
        };
      }
    
      // INSPECTION CHAMBER
      if (
        hasAny("inspectionChamberCompletionPercentage", "inspectionChamberProper", "inspectionChamberRemarks")
      ) {
        data.inspectionChamber = {
          ...(body.inspectionChamberCompletionPercentage !== undefined && {
            completionPercentage: body.inspectionChamberCompletionPercentage || null
          }),
          ...(body.inspectionChamberProper !== undefined && {
            isProper: toBool(body.inspectionChamberProper)
              ? {
                  value: true,
                  remarks: body.inspectionChamberRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // STORM WATER DRAINS
      if (
        hasAny("stormWaterCompletionPercentage", "stormWaterDrainsProper", "stormWaterDrainsRemarks")
      ) {
        data.stormWaterDrains = {
          ...(body.stormWaterCompletionPercentage !== undefined && {
            completionPercentage: body.stormWaterCompletionPercentage || null
          }),
          ...(body.stormWaterDrainsProper !== undefined && {
            isProper: toBool(body.stormWaterDrainsProper)
              ? {
                  value: true,
                  remarks: body.stormWaterDrainsRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // SULLAGE DRAIN
      if (
        hasAny("sullageDrainCompletionPercentage", "sullageDrainProper", "sullageDrainRemarks")
      ) {
        data.sullageDrain = {
          ...(body.sullageDrainCompletionPercentage !== undefined && {
            completionPercentage: body.sullageDrainCompletionPercentage || null
          }),
          ...(body.sullageDrainProper !== undefined && {
            isProper: toBool(body.sullageDrainProper)
              ? {
                  value: true,
                  remarks: body.sullageDrainRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // ROAD
      if (hasAny("roadType", "roadQuality") || hasFiles("roadPhotos")) {
        data.road = {
          ...(body.roadType !== undefined && {
            roadType: body.roadType || null
          }),
          ...(body.roadQuality !== undefined && {
            quality: body.roadQuality || null
          }),
          ...(hasFiles("roadPhotos") && {
            photos: getFiles("roadPhotos")
          })
        };
      }
    
      // PAVER BLOCK
      if (
        hasAny("paverBlockCompletionPercentage", "paverBlockProper", "paverBlockRemarks")
      ) {
        data.paverBlock = {
          ...(body.paverBlockCompletionPercentage !== undefined && {
            completionPercentage: body.paverBlockCompletionPercentage || null
          }),
          ...(body.paverBlockProper !== undefined && {
            isProper: toBool(body.paverBlockProper)
              ? {
                  value: true,
                  remarks: body.paverBlockRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // COMPOUND WALL
      if (
        hasAny(
          "compoundWallQuality", "compoundWallQualityRemarks",
          "compoundWallExpansionJoints", "compoundWallExpansionRemarks",
          "compoundWallAirVents", "compoundWallAirVentsRemarks"
        ) ||
        hasFiles("compoundWallQualityPhotos", "compoundWallExpansionPhotos", "compoundWallAirVentsPhotos")
      ) {
        data.compoundWall = {
          ...(body.compoundWallQuality !== undefined && {
            quality: toBool(body.compoundWallQuality)
              ? {
                  value: true,
                  remarks: body.compoundWallQualityRemarks || null,
                  photos: getFiles("compoundWallQualityPhotos")
                }
              : { value: false }
          }),
    
          ...(body.compoundWallExpansionJoints !== undefined && {
            expansionJoints: toBool(body.compoundWallExpansionJoints)
              ? {
                  value: true,
                  remarks: body.compoundWallExpansionRemarks || null,
                  photos: getFiles("compoundWallExpansionPhotos")
                }
              : { value: false }
          }),
    
          ...(body.compoundWallAirVents !== undefined && {
            airVents: toBool(body.compoundWallAirVents)
              ? {
                  value: true,
                  remarks: body.compoundWallAirVentsRemarks || null,
                  photos: getFiles("compoundWallAirVentsPhotos")
                }
              : { value: false }
          })
        };
      }
    
      // RAIN WATER HARVESTING
      if (
        hasAny("rainWaterCompletionPercentage", "rainWaterPits", "rainWaterProper", "rainWaterRemarks")
      ) {
        data.rainWaterHarvesting = {
          ...(body.rainWaterCompletionPercentage !== undefined && {
            completionPercentage: body.rainWaterCompletionPercentage || null
          }),
          ...(body.rainWaterPits !== undefined && {
            numberOfPits: body.rainWaterPits || null
          }),
          ...(body.rainWaterProper !== undefined && {
            isProper: toBool(body.rainWaterProper)
              ? {
                  value: true,
                  remarks: body.rainWaterRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // LANDSCAPING
      if (
        hasAny("landScapingCompletionPercentage", "landScapingProper", "landScapingRemarks")
      ) {
        data.landScaping = {
          ...(body.landScapingCompletionPercentage !== undefined && {
            completionPercentage: body.landScapingCompletionPercentage || null
          }),
          ...(body.landScapingProper !== undefined && {
            isProper: toBool(body.landScapingProper)
              ? {
                  value: true,
                  remarks: body.landScapingRemarks || null
                }
              : { value: false }
          })
        };
      }
    
      // OTHER DEFECTS
      if (
        hasAny("otherDefectsDescription", "otherDefectsCategory", "otherDefectsLocation") ||
        hasFiles("otherDefectsPhotos")
      ) {
        data.otherDefects = {
          ...(body.otherDefectsDescription !== undefined && {
            description: body.otherDefectsDescription || null
          }),
          ...(body.otherDefectsCategory !== undefined && {
            category: body.otherDefectsCategory || null
          }),
          ...(body.otherDefectsLocation !== undefined && {
            location: body.otherDefectsLocation || null
          }),
          ...(hasFiles("otherDefectsPhotos") && {
            photos: getFiles("otherDefectsPhotos")
          })
        };
      }
    
      // GENERAL REMARKS
      if (hasAny("generalRemarks")) {
        data.generalRemarks = {
          remarks: body.generalRemarks || null
        };
      }
    
      
  
  return updateTakeoverDevelopmentWorkDB(id, { ...body, updatedById: userId });
};

export const deleteTakeoverDevelopmentWorkUsecase = async (id: string) => {
  return deleteTakeoverDevelopmentWorkDB(id);
};
export const getTakeoverDevelopmentWorkByProjectIdUsecase = async (
  projectId: string
) => {
  const data =
    await getTakeoverDevelopmentWorkByProjectIdDB(projectId);

  if (!data || data.length === 0) {
    throw new Error("Takeover development work not found");
  }

  return data;
};