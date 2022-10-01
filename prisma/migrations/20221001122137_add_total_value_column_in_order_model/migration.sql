/*
  Warnings:

  - Added the required column `amount` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValue` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderProducts" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "totalValue" DOUBLE PRECISION NOT NULL;
