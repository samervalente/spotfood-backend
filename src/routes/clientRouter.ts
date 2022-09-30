import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import clientSchema from "../schemas/clientSchema";
import authSchema from "../schemas/authSchema";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";
import { validateClientRegisterData, validateClientLoginData } from "../middlewares/clientMiddleware";
import { registerClient, loginClient, getClientCart, checkToken } from "../controllers/clientController";

const routes = Router()

routes.post("/clients", schemaValidator(clientSchema), validateClientRegisterData, registerClient )
routes.post("/clients/login", schemaValidator(authSchema), validateClientLoginData, loginClient )

routes.get("/clients/:id/cart", tokenValidator, getClientCart)
routes.post('/auth/validate', tokenValidator, checkToken);
export default routes