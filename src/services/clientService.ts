import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as clientRepository from "../repositories/clientRepository"
import dotenv from "dotenv"
import {ClientDataType} from "../types/clientType"

dotenv.config()

export async function getClientById(userId: number){
    const user = await clientRepository.getClientById(userId)
    return user
}

export async function getClientByEmail(email: string){
    const user = await clientRepository.getClientByEmail(email)
    return user
}

export async function registerClient(clientData: ClientDataType){
    const {password} = clientData
    clientData.password = bcrypt.hashSync(password, 10)
    
    return await clientRepository.insertClient(clientData)
}


export async function loginClient(clientId: number){
    const secret_key = String(process.env.SECRET_KEY)
    const token = jwt.sign({id: clientId}, secret_key)
    
    return token
}