import prisma from "../database/prisma"
import {ClientDataType} from "../types/clientType"

export async function getClientById(id: number){
    const client = await prisma.client.findFirst({where: {id}})
    return client
}

export async function getClientByEmail(email: string){
    const client = await prisma.client.findFirst({where: {email}})
    return client
}


export async function insertClient(userData: ClientDataType){
    return await prisma.client.create({data: userData})
}