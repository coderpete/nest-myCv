-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "job_posting_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_resume" ("accountId", "employer_id", "id", "job_posting_id", "url") SELECT "accountId", "employer_id", "id", "job_posting_id", "url" FROM "resume";
DROP TABLE "resume";
ALTER TABLE "new_resume" RENAME TO "resume";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
