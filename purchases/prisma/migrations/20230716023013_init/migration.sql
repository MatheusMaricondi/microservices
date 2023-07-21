-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_code" TEXT NOT NULL,
    "product_name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_product_code_key" ON "User"("product_code");
