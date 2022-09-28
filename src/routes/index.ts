import {Router} from "express"
import restaurantRouter from "./restaurantRouter"
import clientRouter from "./clientRouter"

const routes = Router()

routes.use(restaurantRouter)
routes.use(clientRouter)

export default routes


