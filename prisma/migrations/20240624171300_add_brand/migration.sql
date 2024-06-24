/*
  Warnings:

  - Added the required column `brand_id` to the `Mattress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mattress" ADD COLUMN     "brand_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mattress" ADD CONSTRAINT "Mattress_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
