import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import restaurantSchema from "../schemas/restaurantSchema";
import authSchema from "../schemas/authSchema";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import { validateRestaurantRegisterData, validateRestaurantLoginData } from "../middlewares/restaurantMiddleware";
import { registerRestaurant, listRestaurants, loginRestaurant } from "../controllers/restaurantController";

const routes = Router()

routes.post("/restaurants", schemaValidator(restaurantSchema), validateRestaurantRegisterData, 
registerRestaurant)

routes.post("/login/restaurants", schemaValidator(authSchema), validateRestaurantLoginData, loginRestaurant )

routes.use(tokenValidator)
routes.get("/restaurants", listRestaurants)
routes.get("/restaurants/:id")

export default routes