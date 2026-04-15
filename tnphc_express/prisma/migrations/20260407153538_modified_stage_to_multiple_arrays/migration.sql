/*
  Warnings:

  - You are about to drop the column `stageId` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_stageId_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "stageId";

-- CreateTable
CREATE TABLE "_projectTostage" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_projectTostage_AB_unique" ON "_projectTostage"("A", "B");

-- CreateIndex
CREATE INDEX "_projectTostage_B_index" ON "_projectTostage"("B");

-- AddForeignKey
ALTER TABLE "_projectTostage" ADD CONSTRAINT "_projectTostage_A_fkey" FOREIGN KEY ("A") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projectTostage" ADD CONSTRAINT "_projectTostage_B_fkey" FOREIGN KEY ("B") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
