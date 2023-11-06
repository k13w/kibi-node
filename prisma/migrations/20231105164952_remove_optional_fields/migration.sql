/*
  Warnings:

  - Made the column `points` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lostSiege` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "points" SET NOT NULL,
ALTER COLUMN "lostSiege" SET NOT NULL;
