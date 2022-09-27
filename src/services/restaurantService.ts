import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as restaurantRepository from "../repositories/restaurantRepository"
import dotenv from "dotenv"
import {RestaurantDataType} from "../types/restaurantType"
import { notFoundError } from "../utils/errorUtils"

dotenv.config()


export async function registerRestaurant(restaurantData: RestaurantDataType){
    const state = await restaurantRepository.getRestauranteState(restaurantData.stateId)

    if(!state){
        throw notFoundError("State not found")
    }

    const {password} = restaurantData
    restaurantData.password = bcrypt.hashSync(password, 10)
    
    return await restaurantRepository.insertRestaurant(restaurantData)
}


export async function loginRestaurant(restaurantId: number){
    const secret_key = String(process.env.JWT_SECRET)
    const token = jwt.sign({userId: restaurantId}, secret_key)
    
    return token
}

export async function getRestaurantByEmail(email: string){
    const restaurant = await restaurantRepository.getRestaurantByEmail(email)
    return restaurant
}

export async function getRestaurantByName(name: string){
    const restaurant = await restaurantRepository.getRestaurantByName(name)
    return restaurant
}

export async function getAllRestaurants(){
    const restaurants = await restaurantRepository.getAllRestaurants()
    return restaurants
}

export async function getRestaurantById(restaurantId: number){
    const user = await restaurantRepository.getRestaurantById(restaurantId)
    return user
}


export async function filterRestaurants(state: string, city: string){

    const restaurants = await restaurantRepository.filterRestaurants(state, city)
    return restaurants

}
