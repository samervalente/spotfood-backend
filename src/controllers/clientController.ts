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
    const id = Number(req.params.id )

    const clientCart = await clientService.getClientCart(id)
    
    res.status(200).send(clientCart)
    
}

export async function checkToken(req: Request, res: Response) {
    res.sendStatus(200);
}