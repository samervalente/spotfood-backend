import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import restaurantSchema from "../schemas/restaurantSchema";
import authSchema from "../schemas/authSchema";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import { validateRestaurantRegisterData, validateRestaurantLoginData } from "../middlewares/restaurantMiddleware";
import { registerRestaurant, listRestaurants, loginRestaurant, getRestaurantById, filterRestaurants } from "../controllers/restaurantController";

const routes = Router()

routes.post("/restaurants", schemaValidator(restaurantSchema), validateRestaurantRegisterData, 
registerRestaurant)
routes.post("/restaurants/login", schemaValidator(authSchema), validateRestaurantLoginData, loginRestaurant )

routes.get("/restaurants",tokenValidator, listRestaurants)
routes.get("/restaurants/:id",tokenValidator, getRestaurantById)
routes.get("/restaurants/filter",tokenValidator, filterRestaurants)
export default routes