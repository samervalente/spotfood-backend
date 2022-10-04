import { faker } from "@faker-js/faker";


export default async function productFactory(typeId: number){
    const product = {
        name:faker.commerce.productName(),
        price:10,
        imageUrl:faker.internet.avatar(),
        typeId:typeId,
        description:faker.lorem.words(3)
    }

    return product
}

