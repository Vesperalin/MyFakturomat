/*
  Warnings:

  - You are about to drop the column `default_quantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `default_unit` on the `Item` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "default_quantity",
DROP COLUMN "default_unit",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" "ItemUnit" NOT NULL;
