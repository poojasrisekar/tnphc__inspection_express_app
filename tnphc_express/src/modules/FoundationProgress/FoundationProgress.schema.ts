import Joi from "joi";

export const createFoundationProgressSchema = Joi.object({
  projectId: Joi.string().required(),

  type: Joi.string().valid("Footing", "Pile", "Raft").required(),

  // COMMON
  total: Joi.number().optional().allow(null),
  completed: Joi.number().optional().allow(null),

  workStartedDate: Joi.date().optional().allow(null),

  // DELAY
  isDelay: Joi.boolean().truthy("true").falsy("false").default(false),
  delayDays: Joi.number().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  // REMARKS
  generalRemarks: Joi.string().optional().allow(null, ""),

  // RAFT ONLY
  raftType: Joi.string().optional().allow(null, "")
});

export const updateFoundationProgressSchema = Joi.object({
  type: Joi.string().valid("Footing", "Pile", "Raft").optional(),

  total: Joi.number().optional().allow(null),
  completed: Joi.number().optional().allow(null),

  workStartedDate: Joi.date().optional().allow(null),

  isDelay: Joi.boolean().truthy("true").falsy("false").optional(),
  delayDays: Joi.number().optional().allow(null),
  delayReason: Joi.string().optional().allow(null, ""),
  delayOtherReason: Joi.string().optional().allow(null, ""),

  generalRemarks: Joi.string().optional().allow(null, ""),

  raftType: Joi.string().optional().allow(null, "")
});