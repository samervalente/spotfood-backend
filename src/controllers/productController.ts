import { Request, Response } from "express";
import * as productService from "../services/productService"

export async function registerProduct(req: Request, res:Response){
    const product = req.body

    await productService.registerProduct(product)

    res.status(201).send("Product created successfully.")

}

export async function searchProduct(req: Request, res:Response){
    const productName = String(req.query.name)

    const products = await productService.searchProduct(productName)
    res.status(200).send(products)
}

export async function getProductsById(req: Request, res:Response){
    const id = Number(req.params.id)

    const product = await productService.getProductById(id)
    res.status(200).send(product)
}