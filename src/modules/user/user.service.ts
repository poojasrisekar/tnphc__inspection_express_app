// user.service.ts — full updated file

import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { generateTokens } from "../../utils/jwt";

type CreateUserInput = {
  userName: string;
  email: string;
  password: string;
  roleId?: string;
  departmentId?: string;
  specialUnitId?: string;
  districtId?: string;
  officerId?: string;
  createdById?: string;
};

type UpdateUserInput = {
  userName?: string;
  email?: string;
  passwordTemp?: string;
  roleId?: string;
  departmentId?: string;
  specialUnitId?: string;
  districtId?: string;
  officerId?: string;
  updatedById?: string;
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function resolveDeptAndUnit(
  departmentId?: string | null,
  specialUnitId?: string | null
) {
  if (departmentId && specialUnitId) {
    throw new Error("Select either a department or a special unit, not both");
  }
  return {
    departmentId: departmentId ?? null,
    specialUnitId: specialUnitId ?? null,
  };
}

// ─── GET ALL ─────────────────────────────────────────────────────────────────

export const getAllUsersService = async (filters?: {
  search?: string;
  roleId?: string;
  departmentId?: string;
  specialUnitId?: string;
  districtId?: string;
  officerId?: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const page = filters?.pageNumber ?? 1;
  const size = filters?.pageSize ?? 10;
  const skip = (page - 1) * size;

  const where: any = { isActive: true };

  if (filters?.search) {
    where.OR = [
      { userName: { contains: filters.search } },
      { email: { contains: filters.search } },
    ];
  }
  if (filters?.roleId) where.roleId = filters.roleId;
  if (filters?.departmentId) where.departmentId = filters.departmentId;
  if (filters?.specialUnitId) where.specialUnitId = filters.specialUnitId;
  if (filters?.districtId) where.districtId = filters.districtId;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: size,
      orderBy: { createdAt: "desc" },
      include: {
        role: true,
        department: true,
        district: true,
        specialUnit: true,
        officer: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { data, total, page, size };
};

// ─── GET BY ID ───────────────────────────────────────────────────────────────

export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
      department: true,
      district: true,
      specialUnit: true,
      officer: true,
    },
  });
};

// ─── CREATE ──────────────────────────────────────────────────────────────────

export const createUserService = async (data: CreateUserInput) => {
  if (!data.password) throw new Error("Password is required");
  if (!data.userName || !data.email)
    throw new Error("Username and Email are required");

  // Enforce mutual exclusivity
  const { departmentId, specialUnitId } = resolveDeptAndUnit(
    data.departmentId,
    data.specialUnitId
  );

  // Duplicate check: same userName + district + (department OR specialUnit)
  if (data.districtId) {
    const dupWhere: any = {
      userName: data.userName,
      districtId: data.districtId,
      isActive: true,
    };

    if (departmentId) dupWhere.departmentId = departmentId;
    else if (specialUnitId) dupWhere.specialUnitId = specialUnitId;

    const duplicate = await prisma.user.findFirst({ where: dupWhere });
    if (duplicate) {
      throw new Error(
        "A user with the same name already exists in this district and department/unit"
      );
    }
  }

  // Unique email
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingEmail) throw new Error("Email already in use");

  // Unique username
  const existingUserName = await prisma.user.findUnique({
    where: { userName: data.userName },
  });
  if (existingUserName) throw new Error("Username already taken");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      userName: data.userName,
      email: data.email,
      passwordHashed: hashedPassword,
      passwordTemp: data.password,
      roleId: data.roleId ?? null,
      departmentId,
      specialUnitId,
      districtId: data.districtId ?? null,
      officerId: data.officerId ?? null,
      createdById: data.createdById ?? null,
    },
    include: {
      role: true,
      department: true,
      district: true,
      specialUnit: true,
      officer: true,
    },
  });
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export const updateUserService = async (
  id: string,
  data: UpdateUserInput
) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing || !existing.isActive) throw new Error("User not found");

  // Resolve department/specialUnit — fall back to existing values if not provided
  // but if either is explicitly passed, enforce mutual exclusivity
  const incomingDept =
    "departmentId" in data ? data.departmentId : existing.departmentId;
  const incomingUnit =
    "specialUnitId" in data ? data.specialUnitId : existing.specialUnitId;

  const { departmentId, specialUnitId } = resolveDeptAndUnit(
    incomingDept,
    incomingUnit
  );

  // If one side is being set, explicitly null out the other
  const finalDeptId = data.specialUnitId ? null : departmentId;
  const finalUnitId = data.departmentId ? null : specialUnitId;

  // Duplicate check on update (exclude self)
  const distId = data.districtId ?? existing.districtId;
  const uName = data.userName ?? existing.userName;

  if (distId) {
    const dupWhere: any = {
      userName: uName,
      districtId: distId,
      isActive: true,
      NOT: { id },
    };

    if (finalDeptId) dupWhere.departmentId = finalDeptId;
    else if (finalUnitId) dupWhere.specialUnitId = finalUnitId;

    const duplicate = await prisma.user.findFirst({ where: dupWhere });
    if (duplicate) {
      throw new Error(
        "A user with the same name already exists in this district and department/unit"
      );
    }
  }

  // Email uniqueness (exclude self)
  if (data.email && data.email !== existing.email) {
    const emailExists = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id } },
    });
    if (emailExists) throw new Error("Email already in use");
  }

  // Username uniqueness (exclude self)
  if (data.userName && data.userName !== existing.userName) {
    const unameExists = await prisma.user.findFirst({
      where: { userName: data.userName, NOT: { id } },
    });
    if (unameExists) throw new Error("Username already taken");
  }

  const updatedData: any = {
    userName: data.userName,
    email: data.email,
    roleId: data.roleId,
    departmentId: finalDeptId,
    specialUnitId: finalUnitId,
    districtId: data.districtId,
    officerId: data.officerId,
    updatedById: data.updatedById,
  };

  // Admin password update
  if (data.passwordTemp) {
    updatedData.passwordHashed = await bcrypt.hash(String(data.passwordTemp), 10);
    updatedData.passwordTemp = data.passwordTemp;
  }

  return prisma.user.update({
    where: { id },
    data: updatedData,
    include: {
      role: true,
      department: true,
      district: true,
      specialUnit: true,
      officer: true,
    },
  });
};

// ─── SOFT DELETE ─────────────────────────────────────────────────────────────

export const deleteUserService = async (id: string, updatedById?: string) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false, updatedById },
  });
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────

export const loginService = async (data: {
  userName: string;
  password: string;
}) => {
  const user = await prisma.user.findFirst({
    where: { userName: data.userName, isActive: true },
    include: {
      role: true,
      department: true,
      district: true,
      specialUnit: true,
    },
  });

  if (!user) throw new Error("User not found");

  let isMatch = false;

  if (user.passwordHashed && user.passwordHashed.trim() !== "") {
    isMatch = await bcrypt.compare(data.password, user.passwordHashed);
  } else if (user.passwordTemp && user.passwordTemp.trim() !== "") {
    if (data.password !== user.passwordTemp)
      throw new Error("Invalid credentials");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHashed: hashedPassword, passwordTemp: "" },
    });
    isMatch = true;
  } else {
    throw new Error("Password not set");
  }

  if (!isMatch) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
    userName: user.userName,
    roleId: user.roleId,
    role: user.role?.name,
    isActive: user.isActive,
  });

  return {
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      department: user.department,
      specialUnit: user.specialUnit,
      district: user.district,
    },
    accessToken,
    refreshToken,
  };
};

// ─── DROPDOWNS ───────────────────────────────────────────────────────────────

export const getDepartmentsService = async () => {
  return prisma.department.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};

export const getDistrictsService = async () => {
  return prisma.district.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};

export const getRolesService = async () => {
  return prisma.roles.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};

// ─── NEW: Special Units dropdown ─────────────────────────────────────────────
export const getSpecialUnitsService = async () => {
  return prisma.specialUnits.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};