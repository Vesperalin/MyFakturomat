/*
  Warnings:

  - You are about to alter the column `name` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `nip` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `street` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `city` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(85)`.
  - You are about to alter the column `postal_code` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - You are about to alter the column `bank_account` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `currency` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.
  - You are about to alter the column `country` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "nip" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "street" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(85),
ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "bank_account" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(60);
