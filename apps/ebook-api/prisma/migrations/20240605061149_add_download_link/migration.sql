/*
  Warnings:

  - You are about to drop the column `url` on the `EBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EBook" DROP COLUMN "url";

-- CreateTable
CREATE TABLE "DownloadLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eBookId" INTEGER,

    CONSTRAINT "DownloadLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DownloadLink" ADD CONSTRAINT "DownloadLink_eBookId_fkey" FOREIGN KEY ("eBookId") REFERENCES "EBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
