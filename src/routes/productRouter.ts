import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import productSchema from "../schemas/productSchema";
import {validateRegisterProductData} from "../middlewares/productMiddleware";
import {registerProduct, searchProduct, getProductsById, addProductToCart,deleteProductFromCart, registerPurchase} from "../controllers/productController";

const routes = Router()

routes.post("/products",tokenValidator, schemaValidator(productSchema), validateRegisterProductData, registerProduct)
routes.get("/products", tokenValidator, searchProduct)
routes.get("/products/:id",tokenValidator, getProductsById)
routes.post("/products/:id/cart",tokenValidator, addProductToCart)
routes.delete("/products/:id/cart", tokenValidator, deleteProductFromCart)
routes.post("/products/purchase", tokenValidator, registerPurchase)
export default routes