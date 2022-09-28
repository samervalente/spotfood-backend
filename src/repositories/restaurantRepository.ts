import prisma from "../database/prisma"
import connection from "../database/postgres"
import {RestaurantDataType} from "../types/restaurantType"

export async function insertRestaurant(userData: RestaurantDataType){
    return await prisma.restaurant.create({data: userData})
}

export async function getAllRestaurants(){
    const restaurants = await prisma.restaurant.findMany({select:{name:true, city:true, states:{select:{name:true}}}})

    return restaurants
}

export async function getRestaurantById(id: number){
    const restaurant = await prisma.restaurant.findFirst({where: {id}, select:{name:true, Product:{select:{name:true, price:true, rate:true}}}})
    return restaurant
}

export async function getRestaurantByEmail(email: string){
    const restaurant = await prisma.restaurant.findFirst({where: {email}})
    return restaurant
}

export async function getRestaurantByName(name:string){
    const restaurant = await prisma.restaurant.findFirst({where:{name}})
    return restaurant
}

export async function getRestauranteState(stateId: number){
    const state = await prisma.state.findFirst({where:{id:stateId}})
    return state
}

export async function filterRestaurants(state: string, city: string){
    const {rows: restaurants} = await connection.query(`SELECT r.name, r.city, s.name FROM restaurants r
    JOIN states s
    ON s.id = r."stateId"
    WHERE s.name = $1 AND r.city = $2
    `,[state, city])

    return restaurants
}
