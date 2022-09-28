import { Request, Response, NextFunction } from "express"
import * as productService from "../services/productService"
import {notFoundError} from "../utils/errorUtils"

export async function validateRegisterProductData(req: Request, res:Response, next:NextFunction){
    const product = req.body

    const productType = await productService.getProductType(product.typeId)
    if(!productType){
        throw notFoundError("Product type doesn't exist.")
    }
    next()

}