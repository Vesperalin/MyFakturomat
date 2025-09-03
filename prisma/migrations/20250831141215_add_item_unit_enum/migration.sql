/*
  Warnings:

  - Changed the type of `default_unit` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ItemUnit" AS ENUM ('piece', 'hour', 'day', 'month', 'km', 'km2', 'kg', 'other');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "default_unit",
ADD COLUMN     "default_unit" "ItemUnit" NOT NULL;
