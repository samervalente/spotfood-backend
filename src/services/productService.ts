import { ProductDataType } from "../types/productType"
import * as productRepository from "../repositories/productRepository"
import * as clientRepository from "../repositories/clientRepository"
import { notFoundError } from "../utils/errorUtils"


export async function registerProduct(product: ProductDataType){

    const productType =  await productRepository.getProductType(product.typeId)

    if(!productType){
        throw notFoundError("Product type not found.")
    }

    await productRepository.registerProduct(product)
}

export async function getProductById(productId: number){
    const product = await productRepository.getProductById(productId)

    if(!product){
        throw notFoundError("Product not found")
    }

    return product
}

async function getClientById(clientId: number){
    const client = await clientRepository.getClientById(clientId)

    if(!client){
        throw notFoundError("Client not found")
    }

    return client
}

export async function addProductToCart(productId: number, amount:number, clientId: number){
    await getProductById(productId)

    await getClientById(clientId)

    await productRepository.addProductToCart(productId, amount, clientId)
}

export async function removeProductFromCart(productId: number, clientId: number){
   await getProductById(productId)

   await getClientById(clientId)

    await productRepository.removeProductFromCart(productId, clientId)
}

export async function registerPurchase(products: object[], clientId: number){
    await getClientById(clientId)

   await productRepository.registerPurchase(products, clientId)
   
}