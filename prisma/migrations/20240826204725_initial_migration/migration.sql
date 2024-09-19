-- CreateTable
CREATE TABLE "LocationByEmployer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employer" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "LocationByEmployer_employer_url_idx" ON "LocationByEmployer"("employer", "url");

-- CreateIndex
CREATE UNIQUE INDEX "LocationByEmployer_employer_url_key" ON "LocationByEmployer"("employer", "url");
