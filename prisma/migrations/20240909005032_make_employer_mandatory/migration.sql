/*
  Warnings:

  - Made the column `employer_id` on table `job_posting` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employer_id` on table `resume` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_posting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_job_posting" ("employer_id", "id", "url") SELECT "employer_id", "id", "url" FROM "job_posting";
DROP TABLE "job_posting";
ALTER TABLE "new_job_posting" RENAME TO "job_posting";
CREATE TABLE "new_resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account_id" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "job_posting_id" TEXT,
    "url" TEXT NOT NULL
);
INSERT INTO "new_resume" ("account_id", "employer_id", "id", "job_posting_id", "url") SELECT "account_id", "employer_id", "id", "job_posting_id", "url" FROM "resume";
DROP TABLE "resume";
ALTER TABLE "new_resume" RENAME TO "resume";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
