import { Router } from "express";

import * as controller from "./dropdown.controller";

const router = Router();

router.get(
  "/material-brand-grade",
  controller.getMaterialBrandGradeDropdown
);

export default router;