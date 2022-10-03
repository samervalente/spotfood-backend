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
    const {rows: clientCart} = await connection.query(`
    SELECT c.id as "clientId", c.name as "clientName", p.id as "productId", p.name, p."imageUrl", p.price, cp.amount FROM carts
    JOIN clients c
    ON c.id = carts."clientId"
    JOIN "cartProducts" cp
    ON cp."cartId" = carts.id
    JOIN products p
    ON p.id = cp."productId"
    WHERE carts."clientId" = $1`,[clientId])

    let formatedOutput: any = [];
    if(clientCart.length > 0){
        formatedOutput = await formatCartOutput(clientCart)
    }

    return formatedOutput

}

interface IProduct{
    clientId:number;
    clientName: string;
    totalPrice:number;
    name:string;
    imageUrl:string;
    price:number;
    amount:number;
    productId:number;
}

async function formatCartOutput(cart: IProduct[]){
    const {clientId, clientName} = cart[0]
    let totalPrice = 0;

    let cartProducts = cart.map(product => {
        const totalProduct = product.price*product.amount
        totalPrice += totalProduct
        const {name, imageUrl, price, amount, productId} = product
        return {name, imageUrl, price, amount, productId}
    } )

    const output = {clientId, clientName, totalPrice, cartProducts}
    return output

}