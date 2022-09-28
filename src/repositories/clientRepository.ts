import prisma from "../database/prisma"
import connection from "../database/postgres"
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


export async function getClientCart(clientId: number){
    const {rows: clientCart} = await connection.query(`SELECT c.name as "clientName", carts."totalPrice", p.name, p.price FROM carts
    JOIN clients c
    ON c.id = carts."clientId"
    JOIN "cartProducts" cp
    ON cp."cartId" = carts.id
    JOIN products p
    ON p.id = cp."productId"
    WHERE carts."clientId" = $1`,[clientId])

    const clientCartFormated = await formatCartOutput(clientCart)
    return clientCartFormated

}

interface IProduct{
    clientName: string;
    totalPrice:number;
    name:String;
    price:number;
}

async function formatCartOutput(cart: IProduct[]){
    const clientName = cart[0].clientName
    let totalPrice = 0;

    let cartProducts = cart.map(product => {
        totalPrice += product.price
        return {productName: product.name, price: product.price}
    } )

    const output = {clientName, totalPrice, cartProducts}
    return output

}