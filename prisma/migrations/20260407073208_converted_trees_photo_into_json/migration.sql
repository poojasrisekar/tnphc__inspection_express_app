/*
  Warnings:

  - The `treesPhoto` column on the `LandSiteInspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LandSiteInspection" DROP COLUMN "treesPhoto",
ADD COLUMN     "treesPhoto" JSONB;
