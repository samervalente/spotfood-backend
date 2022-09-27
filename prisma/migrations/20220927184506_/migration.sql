/*
  Warnings:

  - You are about to drop the `Adress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adress" DROP CONSTRAINT "Adress_stateId_fkey";

-- DropTable
DROP TABLE "Adress";

-- DropTable
DROP TABLE "State";

-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "stateId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
