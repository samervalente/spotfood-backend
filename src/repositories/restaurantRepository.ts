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

export async function getAllRestaurants(){
    const restaurants = await prisma.restaurant.findMany({select:{name:true, city:true, states:{select:{name:true}}}})
    return restaurants
}

export async function getRestauranteState(stateId: number){
    const state = await prisma.state.findFirst({where:{id:stateId}})
    return state
}

export async function insertRestaurant(userData: RestaurantDataType){
    return await prisma.restaurant.create({data: userData})
}