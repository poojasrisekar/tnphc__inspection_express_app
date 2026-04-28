import { Router } from "express";
import * as controller from "./grade.controller";
import { validateRequest } from "../../middleware/validateRequest";

import {
  gradeSchema,
  updateGradeSchema,
  getGradeByIdSchema,
  updateGradeParamsSchema,
  listGradesSchema,
} from "./grade.schema";

const router = Router();

router.post(
  "/createGrade",
  validateRequest(gradeSchema),
  controller.createGrade
);

router.get(
  "/listGrades",
  validateRequest(listGradesSchema, "query"),
  controller.listGrades
);

router.get(
  "/getGradeById/:id",
  validateRequest(getGradeByIdSchema, "params"),
  controller.getGradeById
);

router.put(
  "/updateGrade/:id",
  validateRequest(updateGradeParamsSchema, "params"),
  validateRequest(updateGradeSchema),
  controller.updateGrade
);

router.delete(
  "/deleteGrade/:id",
  validateRequest(updateGradeParamsSchema, "params"),
  controller.deleteGrade
);

export default router;