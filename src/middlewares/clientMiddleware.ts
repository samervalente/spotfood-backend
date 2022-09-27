import { Request, Response, NextFunction } from "express"
import * as restaurantService from "../services/clientService"
import { conflictError } from "../utils/errorUtils"

export async function validateRestaurantRegisterData(req: Request, res:Response, next:NextFunction){
    const client = req.body
    const clientOnDB = await restaurantService.getClientByEmail(client.email)

    if(clientOnDB){
        throw conflictError("Restaurant already registered with this email.")
    }

    next()
}