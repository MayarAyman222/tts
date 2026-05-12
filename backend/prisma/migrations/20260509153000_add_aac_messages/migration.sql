CREATE TABLE "AacMessage" (
    "id" SERIAL NOT NULL,
    "senderName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AacMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AacMessage_createdAt_idx" ON "AacMessage"("createdAt");
