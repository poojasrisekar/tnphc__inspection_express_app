import { Router } from "express";
import { baseAuth } from "../middleware/errorHandler";
import userRoutes from "../modules/user/user.routes";
import rolesRouter from "../modules/roles/roles.routes";
import districtRoutes from "../modules/district/district.routes";
import specialUnitRoutes from "../modules/specialUnits/specialUnits.routes";
import projectRoutes from "../modules/project/project.routes";

const router = Router();

router.use("/auth", userRoutes);
router.use("/roles",baseAuth, rolesRouter);
router.use("/special-units",baseAuth, specialUnitRoutes);
router.use("/districts",baseAuth,districtRoutes);
router.use("/projects",baseAuth, projectRoutes);

export default router;   // ✅ IMPORTANT (default export))