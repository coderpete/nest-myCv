/*
  Warnings:

  - You are about to drop the column `contact` on the `employer` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `employer` table. All the data in the column will be lost.
  - You are about to drop the column `posting_location` on the `job_posting` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `resume` table. All the data in the column will be lost.
  - Added the required column `url` to the `job_posting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `resume` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website_url" TEXT,
    "about_url" TEXT,
    "contact_url" TEXT,
    "careers_url" TEXT,
    "glass_door_url" TEXT
);
INSERT INTO "new_employer" ("id", "name") SELECT "id", "name" FROM "employer";
DROP TABLE "employer";
ALTER TABLE "new_employer" RENAME TO "employer";
CREATE TABLE "new_job_posting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_job_posting" ("employer_id", "id") SELECT "employer_id", "id" FROM "job_posting";
DROP TABLE "job_posting";
ALTER TABLE "new_job_posting" RENAME TO "job_posting";
CREATE TABLE "new_resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account_id" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "job_posting_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_resume" ("employer_id", "id", "job_posting_id", "url") SELECT "employer_id", "id", "job_posting_id", "url" FROM "resume";
DROP TABLE "resume";
ALTER TABLE "new_resume" RENAME TO "resume";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
