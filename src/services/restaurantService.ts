import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as restaurantRepository from "../repositories/restaurantRepository"
import dotenv from "dotenv"
import {RestaurantDataType} from "../types/restaurantType"
import { notFoundError } from "../utils/errorUtils"

dotenv.config()


export async function getRestaurantById(restaurantId: number){
    const user = await restaurantRepository.getRestaurantById(restaurantId)
    return user
}

export async function getRetaurantByEmail(email: string){
    const user = await restaurantRepository.getRetaurantByEmail(email)
    return user
}

export async function getAllRestaurants(){
    const restaurants = await restaurantRepository.getAllRestaurants()
    return restaurants
}

export async function registerRestaurant(restaurantData: RestaurantDataType){
    const state = await restaurantRepository.getRestauranteState(restaurantData.stateId)

    if(!state){
        throw notFoundError("State not found")
    }

    const {password} = restaurantData
    restaurantData.password = bcrypt.hashSync(password, 10)
    
    return await restaurantRepository.insertRestaurant(restaurantData)
}


export async function loginRestaurant(clientId: number){
    const secret_key = String(process.env.SECRET_KEY)
    const token = jwt.sign({id: clientId}, secret_key)
    
    return token
}