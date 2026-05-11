import prisma from "../../shared/prisma";

export const getMaterialBrandGradeDropdownService =
  async () => {
    return prisma.material.findMany({
      where: {
        isActive: true,
      },

      select: {
        id: true,
        name: true,

        brands: {
          where: {
            isActive: true,
          },

          select: {
            id: true,
            name: true,

            grades: {
              where: {
                isActive: true,
              },

              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });
  };