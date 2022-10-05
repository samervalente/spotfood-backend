import { faker } from "@faker-js/faker";
import prisma from "../../src/database/prisma";

export async function createRestaurantData(){
    const restaurantDataType = {
        name:faker.company.name(),
        email:faker.internet.email(),
        imageProfile:faker.internet.avatar(),
        password:faker.internet.password(),
        city:"Ananindeua",
        stateId:1
    }

    return restaurantDataType
}


export async function restaurantFactory(){
    const restaurantDataType = {
        name:faker.company.name(),
        email:faker.internet.email(),
        imageProfile:faker.internet.avatar(),
        password:faker.internet.password(),
        city:"Ananindeua",
        stateId:1
    }

    await prisma.restaurant.create({data: restaurantDataType})
    const restaurant = await prisma.restaurant.findFirst({where:{email:restaurantDataType.email }})

    return restaurant
}

export async function populateDatabaseWithRestaurants(amount: number){

    for(let i = 0; i < amount; i ++){
        const restaurantDataType = {
            name:faker.company.name(),
            email:faker.internet.email(),
            imageProfile:faker.internet.avatar(),
            password:faker.internet.password(),
            city:"Ananindeua",
            stateId:1
        }
        await prisma.restaurant.create({data: restaurantDataType})
    }
    
}