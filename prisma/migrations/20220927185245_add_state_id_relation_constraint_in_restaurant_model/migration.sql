-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
