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
     await prisma.client.create({data: userData})
}


export async function getClientCart(clientId: number){
    const {rows: clientCart} = await connection.query(`
    SELECT carts.id as "cartId", c.id as "clientId", c.name as "clientName", p.id as "productId", p.name, p."imageUrl", p.price, cp.amount FROM carts
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
    cartId:number;
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
    const {clientId, clientName, cartId} = cart[0]
    let totalPrice = 0;

    let cartProducts = cart.map(product => {
        const totalProduct = product.price*product.amount
        totalPrice += totalProduct
        const {name, imageUrl, price, amount, productId} = product
        return {name, imageUrl, price, amount, productId}
    } )

    const output = {cartId, clientId, clientName, totalPrice, cartProducts}
    return output
}


export async function getClientOrders(clientId: number){

    const {rows: orders} = await connection.query(`
    SELECT o."orderCode" as order, o."totalValue", TO_CHAR(NOW() :: DATE, 'dd-mm-yyyy') as date, JSON_AGG(JSON_BUILD_OBJECT('name', p.name, 'imageUrl', p."imageUrl", 'amount', op.amount, 'rate', p.rate )) as products
    FROM orders o
    JOIN "orderProducts" op
    ON o.id = op."orderId"
    JOIN products p 
    ON p.id = op."productId"
    JOIN restaurants r
    ON r.id = p."restaurantId"
    WHERE o."clientId" = $1
    GROUP BY "orderCode", o."totalValue", o."createdAt"
	ORDER BY o."createdAt" DESC
	
	
    `,[clientId])

    return orders


}