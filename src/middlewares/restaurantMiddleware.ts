import { Request, Response, NextFunction } from "express"
import * as restaurantService from "../services/restaurantService"
import { conflictError, unauthorizedError } from "../utils/errorUtils"
import bcrypt from "bcrypt"

export async function validateRestaurantRegisterData(req: Request, res:Response, next:NextFunction){
    const restaurant = req.body

    const restaurantWithSameName = await restaurantService.getRestaurantByName(restaurant.name)

    if(restaurantWithSameName){
        throw conflictError("Restaurant already registered with this name.")
    }

    const restaurantWithSameEmail = await restaurantService.getRestaurantByEmail(restaurant.email)

    if(restaurantWithSameEmail){
        throw conflictError("Restaurant already registered with this email.")
    }

    next()

}

export async function validateRestaurantLoginData(req: Request, res:Response, next:NextFunction){
    const restaurant = req.body
    const restaurantOnDB = await restaurantService.getRestaurantByEmail(restaurant.email)

    if(!restaurantOnDB){
        throw unauthorizedError("Email or password incorrect.")
    }

    const isPasswordCorrect = bcrypt.compareSync(restaurant.password, restaurantOnDB.password)
    if(!isPasswordCorrect){
        throw unauthorizedError("Email or password incorrect.")
    }

    console.log(restaurantOnDB)
    res.locals.user = restaurantOnDB

    next()

}