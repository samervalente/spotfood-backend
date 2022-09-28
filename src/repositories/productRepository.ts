import prisma from "../database/prisma";
import { ProductDataType } from "../types/productType";
import connection from "../database/postgres";

export async function registerProduct(product: ProductDataType){
    await prisma.product.create({data:product})
}

export async function getProductType(typeId: number){
   return await prisma.productType.findFirst({where:{id:typeId}})
}

export async function getProductsByName(productName: string){
    const products = await connection.query(`SELECT * FROM products p WHERE p.name ILIKE $1`, [productName])
    return products
}

export async function getProductById(productId: number){
   return await prisma.product.findFirst({where:{id:productId}})
}


export async function addProductToCart(productId: number,  clientId: number){
    await connection.query(`INSERT INTO "cartProducts"`)
}