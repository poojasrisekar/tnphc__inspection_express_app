/*
  Warnings:

  - You are about to drop the column `department` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `officers` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "department",
DROP COLUMN "officers",
ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "officerId" TEXT;

-- DropEnum
DROP TYPE "DepartmentEnum";

-- DropEnum
DROP TYPE "OfficersEnum";

-- CreateTable
CREATE TABLE "officer" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "officer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "officer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
