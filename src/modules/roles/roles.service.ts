import prisma from "../../shared/prisma";

/**
 * Create Role
 */
export const createRoleService = async (data: {
  name: string;
  description: string;
}) => {
  return prisma.roles.create({
    data,
  });
};

/**
 * Get All Roles (with pagination + search)
 */
export const getAllRolesService = async (
  pageNumber: number,
  pageSize: number,
  search?: string
) => {
  const skip = (pageNumber - 1) * pageSize;

  return prisma.roles.findMany({
    where: {
      isActive: true,
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    // skip,
    // take: pageSize,
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Get Role By ID
 */
export const getRoleByIdService = async (id: string) => {
  return prisma.roles.findUnique({
    where: { id },
  });
};

/**
 * Update Role
 */
export const updateRoleService = async (
  id: string,
  data: { name?: string; description?: string }
) => {
  return prisma.roles.update({
    where: { id },
    data,
  });
};

/**
 * Delete Role (Soft delete)
 */
export const deleteRoleService = async (id: string) => {
  return prisma.roles.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};