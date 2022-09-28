import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import productSchema from "../schemas/productSchema";
import {validateRegisterProductData} from "../middlewares/productMiddleware";
import {registerProduct, searchProduct, getProductsById } from "../controllers/productController";

const routes = Router()

routes.post("/products", schemaValidator(productSchema), validateRegisterProductData, registerProduct)
routes.get("/products", searchProduct)
routes.get("/products/:id", getProductsById)

export default routes