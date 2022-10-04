import prisma from "../../src/database/prisma";

export default async function typeFactory(){
    const productType = {
        type:"Churrasco"
    }

    await prisma.productType.create({data: productType})
    const type = await prisma.productType.findFirst({where: {type: productType.type}})

    return type
}