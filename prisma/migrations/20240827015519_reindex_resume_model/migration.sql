/*
  Warnings:

  - A unique constraint covering the columns `[employer]` on the table `resume` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "resume_employer_url_key";

-- DropIndex
DROP INDEX "resume_employer_url_idx";

-- CreateIndex
CREATE INDEX "resume_employer_idx" ON "resume"("employer");

-- CreateIndex
CREATE UNIQUE INDEX "resume_employer_key" ON "resume"("employer");
