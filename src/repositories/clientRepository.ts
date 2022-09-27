import prisma from "../database/prisma"
import {ClientDataType} from "../types/clientType"

export async function getClientById(id: number){
    const user = await prisma.client.findFirst({where: {id}})
    return user
}

export async function getClientByEmail(email: string){
    const user = await prisma.client.findFirst({where: {email}})
    return user
}


export async function insertClient(userData: ClientDataType){
    return await prisma.client.create({data: userData})
}