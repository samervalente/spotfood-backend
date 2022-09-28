import { Request, Response } from "express";
import * as productService from "../services/productService"

export async function registerProduct(req: Request, res:Response){
    let product = req.body
    const restaurantId = res.locals.userId
    product = {...product, restaurantId}
  
    await productService.registerProduct(product)
    res.status(201).send("Product created successfully.")

}

export async function searchProduct(req: Request, res:Response){
    const productName = String(req.query.name)

    console.log(productName)
    const products = await productService.searchProduct(productName)
    res.status(200).send(products)
}

export async function getProductsById(req: Request, res:Response){
    const id = Number(req.params.id)

    const product = await productService.getProductById(id)
    res.status(200).send(product)
}

export async function addProductToCart(req: Request, res:Response){
    const clientId = res.locals.userId
    const productId = Number(req.params.id)
    const {amount} = req.body

    await productService.addProductToCart(productId, amount, clientId)

    res.status(201).send("Product added to cart successfully.")
}

export async function deleteProductFromCart(req: Request, res:Response){
    const clientId = res.locals.userId
    const productId = Number(req.params.id)

    await productService.removeProductFromCart(productId, clientId)

    res.sendStatus(200)
    
}

export async function registerPurchase(req: Request, res:Response){
    const products = req.body
    const clientId = res.locals.userId

    await productService.registerPurchase(products, clientId)

    res.sendStatus(200)
}