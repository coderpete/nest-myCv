/*
  Warnings:

  - You are about to drop the `cv` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cv";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "resume_employer_url_idx" ON "resume"("employer", "url");

-- CreateIndex
CREATE UNIQUE INDEX "resume_employer_url_key" ON "resume"("employer", "url");
