import { Request, Response } from "express";
import * as clientService from "../services/clientService"

export async function registerClient(req: Request, res:Response){
    const restaurantRegisterData = req.body

    await clientService.registerClient(restaurantRegisterData)

    res.status(201).send("Client created successfully.")
}

export async function loginClient(req: Request, res:Response){
    const {id} = res.locals.client

    const clientData = await clientService.loginClient(id)

    res.status(200).send(clientData)
}

export async function getClientCart(req: Request, res:Response){
    const clientId: number = res.locals.userId

    const clientCart = await clientService.getClientCart(clientId)
    
    res.status(200).send(clientCart)
    
}

export async function getClientOrders(req: Request, res:Response){
    const clientId: number = res.locals.userId
    const orders = await clientService.getClientOrders(clientId)

    return res.status(200).send(orders)
}

export async function checkToken(req: Request, res: Response) {
    res.sendStatus(200);
}

