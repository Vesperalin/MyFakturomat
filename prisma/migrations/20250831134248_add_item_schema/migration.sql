-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "price_netto" DOUBLE PRECISION NOT NULL,
    "vatRate" INTEGER NOT NULL,
    "price_brutto" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "default_unit" TEXT NOT NULL,
    "default_quantity" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
