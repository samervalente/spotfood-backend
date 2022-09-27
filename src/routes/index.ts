import {Router} from "express"
import restaurantRouter from "./restaurantRouter"

const routes = Router()

routes.use(restaurantRouter)

export default routes


