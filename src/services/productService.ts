import { ProductDataType } from "../types/productType"
import * as productRepository from "../repositories/productRepository"


export async function getProductType(typeId: number){
    const product =  await productRepository.getProductType(typeId)
   return product
}

export async function registerProduct(product: ProductDataType){
    await productRepository.registerProduct(product)
}


export async function searchProduct(productName: string){
    const products = await productRepository.getProductsByName(productName)

    return products
}

export async function getProductById(productId: number){
    const product = await productRepository.getProductById(productId)
    return product
}

export async function addProductToCart(productId: number, amount:number, clientId: number){
    await productRepository.addProductToCart(productId, amount, clientId)
}

export async function removeProductFromCart(productId: number, clientId: number){
    await productRepository.removeProductFromCart(productId, clientId)
}

export async function registerPurchase(products: [], clientId: number){
    const orderId = await productRepository.registerPurchase(products, clientId)
    return orderId
}