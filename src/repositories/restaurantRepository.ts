import prisma from "../database/prisma"
import {RestaurantDataType} from "../types/restaurantType"

export async function getRestaurantById(id: number){
    const user = await prisma.restaurant.findFirst({where: {id}})
    return user
}

export async function getRetaurantByEmail(email: string){
    const user = await prisma.restaurant.findFirst({where: {email}})
    return user
}


export async function insertRestaurant(userData: RestaurantDataType){
    return await prisma.restaurant.create({data: userData})
}