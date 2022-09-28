import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import clientSchema from "../schemas/clientSchema";
import authSchema from "../schemas/authSchema";
import { validateClientRegisterData, validateClientLoginData } from "../middlewares/clientMiddleware";
import { registerClient, loginClient } from "../controllers/clientController";

const routes = Router()

routes.post("/clients", schemaValidator(clientSchema), validateClientRegisterData, registerClient )
routes.post("/clients/login", schemaValidator(authSchema), validateClientLoginData, loginClient )
routes.get("/clients/:id/cart")

export default routes