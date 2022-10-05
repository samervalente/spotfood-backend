import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import restaurantSchema from "../schemas/restaurantSchema";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import { registerRestaurant, listRestaurants, getRestaurantById, filterRestaurants } from "../controllers/restaurantController";

const routes = Router()

routes.post("/restaurants", schemaValidator(restaurantSchema), 
registerRestaurant)
routes.get("/restaurants",tokenValidator, listRestaurants)
routes.get("/restaurants/filter",tokenValidator, filterRestaurants)
routes.get("/restaurants/:id",tokenValidator, getRestaurantById)

export default routes