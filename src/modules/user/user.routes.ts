import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "./user.controller";
import { validateRequest } from "../../middleware";
import { createUserSchema, deleteUserSchema, getAllUsersSchema, getUserByIdSchema, loginUserSchema, updateParamsSchema, updateUserSchema } from "./user.schema";

const router = Router();

router.get(
  "/getAllUsers",
  validateRequest(getAllUsersSchema, "query"),
  getAllUsers
);

router.get(
  "/getUserById/:id",
  validateRequest(getUserByIdSchema, "params"),
  getUserById
);


// router.get("/test", (req, res) => {
//   res.send("User route working ✅");
// });

router.post(
  "/login",
  validateRequest(loginUserSchema, "body"),
  login
);
router.post(
  "/createUser",
  validateRequest(createUserSchema, "body"),
  createUser
);
// console.log("✅ user.routes.ts loaded");

// router.post("/createUser", createUser);
router.put(
  "/updateUser/:id",
  validateRequest(updateUserSchema, "body"),
  validateRequest(updateParamsSchema, "params"),
  updateUser
);

router.patch(
  "/deleteUser/:id",
  validateRequest(deleteUserSchema, "params"),
  deleteUser
);
export default router;