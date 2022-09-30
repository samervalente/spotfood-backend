import { Request, Response, NextFunction } from "express"
import * as restaurantService from "../services/clientService"
import { conflictError, unauthorizedError } from "../utils/errorUtils"
import bcrypt from "bcrypt"

export async function validateClientRegisterData(req: Request, res:Response, next:NextFunction){
    const client = req.body
    const clientOnDB = await restaurantService.getClientByEmail(client.email)

    if(clientOnDB){
        throw conflictError("Client already registered with this email.")
    }

    next()
}

export async function validateClientLoginData(req: Request, res:Response, next:NextFunction){
    const client = req.body
    const clientOnDB = await restaurantService.getClientByEmail(client.email)

    if(!clientOnDB){
        throw unauthorizedError("Incorrect email or password")
    }

    const isPasswordCorrect = bcrypt.compareSync(client.password, clientOnDB.password)
    if(!isPasswordCorrect){
        throw unauthorizedError("Incorrect email or password")
    }

    res.locals.client = clientOnDB

    next()
}
