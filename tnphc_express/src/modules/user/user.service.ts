import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { generateTokens } from "../../utils/jwt";

type CreateUserInput = {
  userName: string;
  email: string;
  passwordTemp: string;
  passwordHashed?: string;
  roleId?: string;
  createdById?: string;
};

/**
 * Get all users
 */
export const getAllUsersService = async () => {
  return prisma.user.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Get user by ID
 */
export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    // include: { role: true },
  });
};

/**
 * Create user
 */
export const createUserService = async (data: CreateUserInput) => {
  // ✅ Validation (VERY IMPORTANT)
  if (!data.passwordTemp) {
    throw new Error("Password is required");
  }

  if (!data.userName || !data.email) {
    throw new Error("Username and Email are required");
  }

  // ✅ Hash password safely
  const hashedPassword = await bcrypt.hash(String(data.passwordTemp), 10);

  return prisma.user.create({
    data: {
      userName: data.userName,
      email: data.email,
      passwordHashed: hashedPassword,

      // ❗ optional: don't store plain password in real apps
      passwordTemp: data.passwordTemp,

      roleId: data.roleId ?? null,
      createdById: data.createdById ?? null,
    },
  });
};

/**
 * Update user
 */
export const updateUserService = async (
  id: string,
  data: Partial<CreateUserInput> & { updatedById?: string }
) => {
  let updatedData: any = {
    userName: data.userName,
    email: data.email,
    roleId: data.roleId,
    updatedById: data.updatedById,
  };

  // ✅ If password is updated → hash again
  if (data.passwordTemp) {
    updatedData.passwordHashed = await bcrypt.hash(
      String(data.passwordTemp),
      10
    );
    updatedData.passwordTemp = data.passwordTemp;
  }

  return prisma.user.update({
    where: { id },
    data: updatedData,
  });
};

/**
 * Soft delete user
 */
export const deleteUserService = async (
  id: string,
  updatedById?: string
) => {
  return prisma.user.update({
    where: { id },
    data: {
      isActive: false,
      updatedById,
    },
  });
};


export const loginService = async (data: {
  userName: string;
  password: string;
}) => {

  const user = await prisma.user.findFirst({
    where: {
      userName: data.userName,
      isActive: true,
    },
    include: { role: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.passwordHashed) {
    throw new Error("Password not set");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.passwordHashed
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // ✅ NEW TOKEN SYSTEM
  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
    userName: user.userName,
    roleId: user.roleId,
    role: user.role?.name,
    isActive: user.isActive
  });

  return {
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken
  };
};