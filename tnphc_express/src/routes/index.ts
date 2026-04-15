import { Router } from "express";
import { baseAuth } from "../middleware/auth/baseAuth";
import userRoutes from "../modules/user/user.routes";
import rolesRouter from "../modules/roles/roles.routes";
import districtRoutes from "../modules/district/district.routes";
import specialUnitRoutes from "../modules/specialUnits/specialUnits.routes";
import projectRoutes from "../modules/project/project.routes";
import stageRoutes from "../modules/stage/stage.routes";
import landSiteInspectionRoutes from "../modules/landSiteInspection/landSiteInspection.routes";
import officerRoutes from "../modules/officer/officer.routes";
import departmentRoutes from "../modules/department/department.routes";
import materialRoutes from "../modules/material/material.routes";
import brandRoutes from "../modules/brand/brand.routes";
import gradeRoutes from "../modules/grade/grade.routes";
import masterRoutes from "../modules/master/master.routes";

const router = Router();

router.use("/auth", userRoutes);
router.use("/roles",baseAuth, rolesRouter);
router.use("/special-units",baseAuth, specialUnitRoutes);
router.use("/districts",baseAuth,districtRoutes);
router.use("/projects",baseAuth, projectRoutes);
router.use("/officers",baseAuth, officerRoutes); // ✅ IMPORTANT (default export))
router.use("/departments",baseAuth,departmentRoutes); // ✅ IMPORTANT (default export))
router.use("/stages",baseAuth, stageRoutes); // ✅ IMPORTANT (default export))
router.use("/land-site-inspections",baseAuth, landSiteInspectionRoutes); // ✅ IMPORTANT (default export))
router.use("/materials",baseAuth,materialRoutes); // ✅ IMPORTANT (default export))
router.use("/grades",baseAuth,gradeRoutes); // ✅ IMPORTANT (default export))
router.use("/brands",baseAuth,brandRoutes); // ✅ IMPORTANT (default export))
router.use("/master",baseAuth,masterRoutes);

export default router;   // ✅ IMPORTANT (default export))