-- CreateTable
CREATE TABLE "Mattress" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "firmness" TEXT,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mattress_pkey" PRIMARY KEY ("id")
);
