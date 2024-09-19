/*
  Warnings:

  - You are about to drop the `LocationByEmployer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LocationByEmployer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "cv_employer_url_idx" ON "cv"("employer", "url");

-- CreateIndex
CREATE UNIQUE INDEX "cv_employer_url_key" ON "cv"("employer", "url");
