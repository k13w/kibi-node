/*
  Warnings:

  - The `lostSiege` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `point` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "point" DROP CONSTRAINT "point_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "points" INTEGER,
DROP COLUMN "lostSiege",
ADD COLUMN     "lostSiege" INTEGER;

-- DropTable
DROP TABLE "point";
