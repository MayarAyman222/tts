-- CreateTable
CREATE TABLE "MainCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubIcon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "audioUrl" TEXT,
    "iconId" INTEGER NOT NULL,

    CONSTRAINT "SubIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_name_key" ON "MainCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_category_key" ON "Icon"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_title_key" ON "Icon"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SubIcon_title_key" ON "SubIcon"("title");

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubIcon" ADD CONSTRAINT "SubIcon_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
