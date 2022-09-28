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

routes.use(tokenValidator)
routes.get("/restaurants", listRestaurants)
routes.get("/restaurants/:id", getRestaurantById)
routes.get("/restaurants/filter", filterRestaurants)
export default routes