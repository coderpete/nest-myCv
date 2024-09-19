-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_posting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer_id" TEXT,
    "url" TEXT NOT NULL
);
INSERT INTO "new_job_posting" ("employer_id", "id", "url") SELECT "employer_id", "id", "url" FROM "job_posting";
DROP TABLE "job_posting";
ALTER TABLE "new_job_posting" RENAME TO "job_posting";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
