import { faker } from "@faker-js/faker";
import prisma from "../../src/database/prisma";

export  async function productFactory(typeId: number){
    const product = {
        name:faker.commerce.productName(),
        price:10,
        imageUrl:faker.internet.avatar(),
        rate:3,
        typeId:typeId,
        description:faker.lorem.words(3)
    }

    return product
}

export async function populateDatabaseWithProducts(typeId: number, amount: number){

    for(let i = 0; i < amount ;  i ++){
        const product = {
            name:faker.commerce.productName(),
            price:10,
            imageUrl:faker.internet.avatar(),
            typeId:typeId,
            restaurantId:1,
            description:faker.lorem.words(3)
        }
        await prisma.product.create({data: product})
    }

    const products = await prisma.product.findMany()
    return products
}

