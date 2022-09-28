import prisma from "../database/prisma";
import { ProductDataType } from "../types/productType";
import connection from "../database/postgres";

export async function registerProduct(product: ProductDataType){
    const {name, price, rate, imageUrl, typeId, restaurantId, description} = product

    await connection.query(`
    INSERT INTO products (name, price, rate, "imageUrl", "typeId", "restaurantId", "description") 
    VALUES ($1,$2,$3,$4,$5,$6,$7)`,[name, price, rate, imageUrl, typeId, restaurantId, description])

}

export async function getProductType(typeId: number){
   return await prisma.productType.findFirst({where:{id:typeId}})
}

export async function getProductsByName(productName: string){
    const {rows: products} = await connection.query(`SELECT * FROM products p WHERE p.name 
    ILIKE '${productName}%'`)
    return products
}

export async function getProductById(productId: number){
   return await prisma.product.findFirst({where:{id:productId}})
}


export async function createCart(clientId: number){
    await connection.query(`INSERT INTO carts ("clientId") VALUES ($1)`,[clientId])
}

export async function addProductToCart(productId: number, amount:number, clientId: number){
    const {rows: cart} = await connection.query(`SELECT * FROM carts WHERE "clientId" = $1`,[clientId])
    let cartId;

    if(!cart){
        await createCart(clientId)
        const {rows: existentCart} = await connection.query(`SELECT * FROM carts WHERE "clientId" = $1`,[clientId])
        cartId = existentCart[0].id
    }else{
        cartId = cart[0].id
    }

    await connection.query(`INSERT INTO "cartProducts" ("cartId", "productId", amount ) VALUES ($1,$2,$3) `,[cartId, productId, amount])
}


export async function removeProductFromCart(productId:number, clientId:number){
    const cart: any = await prisma.cart.findFirst({where:{id:clientId}})

    await connection.query(`DELETE FROM "cartProducts" WHERE "cartId" = $1 AND "productId" = $2`,[cart.id, productId])
}