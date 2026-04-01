-- CreateEnum
CREATE TYPE "DepartmentEnum" AS ENUM ('POLICE', 'PRISON', 'FRS');

-- CreateEnum
CREATE TYPE "OfficersEnum" AS ENUM ('LEVEL1', 'LEVEL2', 'LEVEL3');

-- CreateEnum
CREATE TYPE "StageEnum" AS ENUM ('LandSiteInspectionStage', 'PreConstructionStage', 'FoundationStage', 'PlinthStage', 'SuperStructureStage', 'InteriorsStage', 'ExteriorsStage', 'DevelopmentWorksStage', 'TakeOverStage');

-- CreateTable
CREATE TABLE "special_units" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "special_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "districtId" TEXT NOT NULL,
    "department" "DepartmentEnum",
    "specialUnitId" TEXT,
    "officers" "OfficersEnum" NOT NULL,
    "locationName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "stage" "StageEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "special_units_code_idx" ON "special_units"("code");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_specialUnitId_fkey" FOREIGN KEY ("specialUnitId") REFERENCES "special_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
