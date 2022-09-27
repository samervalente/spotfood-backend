import { Request, Response, NextFunction } from "express"
import * as restaurantService from "../services/restaurantService"
import { conflictError, unauthorizedError } from "../utils/errorUtils"
import bcrypt from "bcrypt"

export async function validateRestaurantRegisterData(req: Request, res:Response, next:NextFunction){
    const restaurant = req.body
    const restaurantOnDB = await restaurantService.getRetaurantByEmail(restaurant.email)

    if(restaurantOnDB){
        throw conflictError("Restaurant already registered with this email.")
    }

    next()

}

export async function validateRestaurantLoginData(req: Request, res:Response, next:NextFunction){
    const restaurant = req.body
    const restaurantOnDB = await restaurantService.getRetaurantByEmail(restaurant.email)

    if(!restaurantOnDB){
        throw unauthorizedError("Email or password incorrect.")
    }

    const isPasswordCorrect = bcrypt.compareSync(restaurant.password, restaurantOnDB.password)
    if(!isPasswordCorrect){
        throw unauthorizedError("Email or password incorrect.")
    }

    next()

}