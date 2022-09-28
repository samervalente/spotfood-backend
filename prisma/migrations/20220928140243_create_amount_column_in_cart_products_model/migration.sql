/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `carts` table. All the data in the column will be lost.
  - Added the required column `amount` to the `cartProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cartProducts" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "totalPrice";
