import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as restaurantRepository from "../repositories/restaurantRepository"
import dotenv from "dotenv"
import {RestaurantDataType} from "../types/restaurantType"
import { conflictError, notFoundError } from "../utils/errorUtils"

dotenv.config()


export async function registerRestaurant(restaurantData: RestaurantDataType){
 
    const restaurant = await restaurantRepository.getRestaurantByEmail(restaurantData.email)

    if(restaurant){
        throw conflictError("Restaurant email already exists.")
    }
    const state = await restaurantRepository.getRestauranteState(restaurantData.stateId)
    if(!state){
        throw notFoundError("State not found")
    }

    const {password} = restaurantData
    restaurantData.password = bcrypt.hashSync(password, 10)
    
     await restaurantRepository.insertRestaurant(restaurantData)
}


export async function getAllRestaurants(){
    const restaurants = await restaurantRepository.getAllRestaurants()
    return restaurants
}

export async function getRestaurantById(clientId:number, restaurantId: number){
    const restaurant = await restaurantRepository.getRestaurantById(clientId, restaurantId)

    if(!restaurant){
        throw notFoundError("Restaurant not found.")
    }
    
    return restaurant
}


export async function filterRestaurants(state: string, city: string){
    const restaurants = await restaurantRepository.filterRestaurants(state, city)
    return restaurants
}
