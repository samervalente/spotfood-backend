/*
  Warnings:

  - Changed the type of `stateId` on the `restaurants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "stateId",
ADD COLUMN     "stateId" INTEGER NOT NULL;
