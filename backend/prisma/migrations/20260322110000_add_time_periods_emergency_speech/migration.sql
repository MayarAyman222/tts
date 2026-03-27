-- CreateTable
CREATE TABLE "TimePeriod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,
    "mainCategoryId" INTEGER NOT NULL,

    CONSTRAINT "TimePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyNumber" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT,

    CONSTRAINT "EmergencyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeechAttempt" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeechAttempt_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Icon" ADD COLUMN "timePeriodId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyNumber_number_key" ON "EmergencyNumber"("number");

-- CreateIndex
CREATE INDEX "SpeechAttempt_word_idx" ON "SpeechAttempt"("word");

-- CreateIndex
CREATE UNIQUE INDEX "TimePeriod_name_mainCategoryId_key" ON "TimePeriod"("name", "mainCategoryId");

-- AddForeignKey
ALTER TABLE "TimePeriod" ADD CONSTRAINT "TimePeriod_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_timePeriodId_fkey" FOREIGN KEY ("timePeriodId") REFERENCES "TimePeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
