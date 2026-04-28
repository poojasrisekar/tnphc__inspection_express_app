/*
  Warnings:

  - You are about to drop the column `stage` on the `project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Yes', 'No');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "stage",
ADD COLUMN     "stageId" TEXT;

-- DropEnum
DROP TYPE "StageEnum";

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "table_name" VARCHAR(100) NOT NULL,
    "record_id" VARCHAR(36) NOT NULL,
    "action" VARCHAR(20) NOT NULL,
    "old_value" JSONB,
    "new_value" JSONB,
    "user_id" VARCHAR(36),
    "role_id" VARCHAR(36),
    "ip_address" VARCHAR(45),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(36),
    "updated_by_id" VARCHAR(36),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "audit_logs_code_key" ON "audit_logs"("code");

-- CreateIndex
CREATE INDEX "audit_logs_table_name_idx" ON "audit_logs"("table_name");

-- CreateIndex
CREATE INDEX "audit_logs_record_id_idx" ON "audit_logs"("record_id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
