ALTER TABLE "AacMessage" ADD COLUMN IF NOT EXISTS "senderId" INTEGER;
ALTER TABLE "AacMessage" ADD COLUMN IF NOT EXISTS "receiverId" INTEGER;

CREATE INDEX IF NOT EXISTS "AacMessage_receiverId_createdAt_idx"
ON "AacMessage"("receiverId", "createdAt");

CREATE INDEX IF NOT EXISTS "AacMessage_senderId_createdAt_idx"
ON "AacMessage"("senderId", "createdAt");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AacMessage_senderId_fkey'
  ) THEN
    ALTER TABLE "AacMessage"
    ADD CONSTRAINT "AacMessage_senderId_fkey"
    FOREIGN KEY ("senderId") REFERENCES "User"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AacMessage_receiverId_fkey'
  ) THEN
    ALTER TABLE "AacMessage"
    ADD CONSTRAINT "AacMessage_receiverId_fkey"
    FOREIGN KEY ("receiverId") REFERENCES "User"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
