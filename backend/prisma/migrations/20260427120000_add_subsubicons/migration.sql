-- DropIndex
DROP INDEX IF EXISTS "SubIcon_title_key";

-- CreateTable
CREATE TABLE "SubSubIcon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "audioUrl" TEXT,
    "subIconId" INTEGER NOT NULL,

    CONSTRAINT "SubSubIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubIcon_title_iconId_key" ON "SubIcon"("title", "iconId");

-- CreateIndex
CREATE UNIQUE INDEX "SubSubIcon_title_subIconId_key" ON "SubSubIcon"("title", "subIconId");

-- AddForeignKey
ALTER TABLE "SubSubIcon" ADD CONSTRAINT "SubSubIcon_subIconId_fkey" FOREIGN KEY ("subIconId") REFERENCES "SubIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
