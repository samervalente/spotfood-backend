import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import productSchema from "../schemas/productSchema";
import {registerProduct, getProductsById, addProductToCart,deleteProductFromCart, registerPurchase} from "../controllers/productController";

const routes = Router()

routes.post("/products",tokenValidator, schemaValidator(productSchema), registerProduct)
routes.get("/products/:id",tokenValidator, getProductsById)
routes.post("/products/:id/cart",tokenValidator, addProductToCart)
routes.delete("/products/:id/cart", tokenValidator, deleteProductFromCart)
routes.post("/products/purchase", tokenValidator, registerPurchase)
export default routes