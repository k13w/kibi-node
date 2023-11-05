/*
  Warnings:

  - Added the required column `lostSiege` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "lostSiege" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "watchlist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_name_key" ON "watchlist"("name");
