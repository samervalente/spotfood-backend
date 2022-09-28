import {Router} from "express"
import restaurantRouter from "./restaurantRouter"
import clientRouter from "./clientRouter"
import productRouter from "./productRouter"

const routes = Router()

routes.use(restaurantRouter)
routes.use(clientRouter)
routes.use(productRouter)

export default routes


