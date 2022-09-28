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