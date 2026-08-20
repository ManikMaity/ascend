-- AlterTable
ALTER TABLE "account" ADD COLUMN "issuer" TEXT;

-- Backfill issuer for any existing rows (Better Auth 1.7+ requirement)
UPDATE "account"
SET "issuer" = CASE
  WHEN "providerId" = 'google' THEN 'https://accounts.google.com'
  WHEN "providerId" = 'credential' THEN 'local:credential'
  ELSE 'local:oauth:' || "providerId"
END
WHERE "issuer" IS NULL;

ALTER TABLE "account" ALTER COLUMN "issuer" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_issuer_accountId_key" ON "account"("issuer", "accountId");
