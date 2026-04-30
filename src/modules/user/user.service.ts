import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { generateTokens } from "../../utils/jwt";

type CreateUserInput = {
  userName: string;
  email: string;
  passwordTemp: string;
  passwordHashed?: string;
  roleId?: string;
  departmentId?: string;
  districtId?: string;
  officerId?: string;
  createdById?: string;
};

// ─── GET ALL ────────────────────────────────────────────────────────────────

export const getAllUsersService = async (filters?: {
  search?: string;
  roleId?: string;
  departmentId?: string;
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
  if (filters?.districtId) where.districtId = filters.districtId;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: size,
      orderBy: { createdAt: "desc" },
      include: { role: true, department: true, district: true },
    }),
    prisma.user.count({ where }),
  ]);

  return { data, total, page, size };
};

// ─── GET BY ID ───────────────────────────────────────────────────────────────

export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true, department: true, district: true },
  });
};

// ─── CREATE ──────────────────────────────────────────────────────────────────

export const createUserService = async (data: any) => {
  if (!data.password) throw new Error("Password is required");
  if (!data.userName || !data.email)
    throw new Error("Username and Email are required");

  // 🔴 Duplicate check
  if (data.departmentId && data.districtId) {
    const duplicate = await prisma.user.findFirst({
      where: {
        userName: data.userName,
        departmentId: data.departmentId,
        districtId: data.districtId,
        isActive: true,
      },
    });

    if (duplicate) {
      throw new Error(
        "A user with the same name already exists in this department and district"
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

  // ✅ FIX HERE
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      userName: data.userName,
      email: data.email,
      passwordHashed: hashedPassword,
      passwordTemp: data.password,

      

      roleId: data.roleId ?? null,
      departmentId: data.departmentId ?? null,
      districtId: data.districtId ?? null,
      officerId: data.officerId ?? null,
      createdById: data.createdById ?? null,
    },
    include: { role: true, department: true, district: true },
  });
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export const updateUserService = async (
  id: string,
  data: Partial<CreateUserInput> & { updatedById?: string }
) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing || !existing.isActive) throw new Error("User not found");

  // Duplicate check on update (exclude self)
  const deptId = data.departmentId ?? existing.departmentId;
  const distId = data.districtId ?? existing.districtId;
  const uName = data.userName ?? existing.userName;

  if (deptId && distId) {
    const duplicate = await prisma.user.findFirst({
      where: {
        userName: uName,
        departmentId: deptId,
        districtId: distId,
        isActive: true,
        NOT: { id },
      },
    });
    if (duplicate) {
      throw new Error(
        "A user with the same name already exists in this department and district"
      );
    }
  }

  // Check email uniqueness (exclude self)
  if (data.email && data.email !== existing.email) {
    const emailExists = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id } },
    });
    if (emailExists) throw new Error("Email already in use");
  }

  // Check username uniqueness (exclude self)
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
    departmentId: data.departmentId,
    districtId: data.districtId,
    officerId: data.officerId,
    updatedById: data.updatedById,
  };

  // ✅ Direct password update (admin edits, not forgot-password flow)
  if (data.passwordTemp) {
    updatedData.passwordHashed = await bcrypt.hash(String(data.passwordTemp), 10);
    updatedData.passwordTemp = data.passwordTemp;
  }

  return prisma.user.update({
    where: { id },
    data: updatedData,
    include: { role: true, department: true, district: true,officer: true },
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

export const loginService = async (data: { userName: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: { userName: data.userName, isActive: true },
    include: { role: true, department: true, district: true },
  });

  if (!user) throw new Error("User not found");

  let isMatch = false;

  if (user.passwordHashed && user.passwordHashed.trim() !== "") {
    isMatch = await bcrypt.compare(data.password, user.passwordHashed);
  } else if (user.passwordTemp && user.passwordTemp.trim() !== "") {
    if (data.password !== user.passwordTemp) throw new Error("Invalid credentials");

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