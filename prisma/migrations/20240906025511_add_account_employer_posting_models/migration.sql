/*
  Warnings:

  - You are about to drop the column `employer` on the `resume` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employer_id` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_posting_id` to the `resume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "job_posting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer_id" TEXT NOT NULL,
    "posting_location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "employer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "contact" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "job_posting_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "resume_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resume" ("id", "url") SELECT "id", "url" FROM "resume";
DROP TABLE "resume";
ALTER TABLE "new_resume" RENAME TO "resume";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
