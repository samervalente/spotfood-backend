import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as clientRepository from "../repositories/clientRepository"
import dotenv from "dotenv"
import {ClientDataType} from "../types/clientType"
import { notFoundError, unauthorizedError } from "../utils/errorUtils"

dotenv.config()

export async function getClientById(userId: number){
    const client = await clientRepository.getClientById(userId)
    return client
}

export async function getClientByEmail(email: string){
    const client = await clientRepository.getClientByEmail(email)
    return client
}

export async function registerClient(clientData: ClientDataType){
    const {password} = clientData
    clientData.password = bcrypt.hashSync(password, 10)
    
    return await clientRepository.insertClient(clientData)
}


export async function loginClient(clientId: number){
    const secret_key = String(process.env.JWT_SECRET)
    const token = jwt.sign({userId: clientId}, secret_key)
    const client = await clientRepository.getClientById(clientId)
    
    if(!client ){
        throw unauthorizedError("Client not authorized.")
    }
    const {name, imageProfile} = client
    return {name, imageProfile, token}
}

export async function getClientCart(clientId: number){
    const client = await clientRepository.getClientById(clientId)

    if(!client){
        throw notFoundError("Client not found.")
    }

    const clientCart = await clientRepository.getClientCart(client.id)
    return clientCart
    
}

export async function getClientOrders(clientId: number){
    const orders = await clientRepository.getClientOrders(clientId)
    return orders

}