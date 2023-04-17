/*
  Warnings:

  - You are about to drop the column `userRatings` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `userRatings`,
    ADD COLUMN `user_ratings` INTEGER NOT NULL DEFAULT 0;
