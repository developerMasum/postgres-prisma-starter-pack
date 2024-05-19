/*
  Warnings:

  - You are about to drop the column `altText` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "altText";

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");
