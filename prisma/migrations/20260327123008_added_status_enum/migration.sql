/*
  Warnings:

  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('TotalProjects', 'CompletedProjects', 'OngoingProjects', 'AssignedProjects');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "status" "status" NOT NULL;
