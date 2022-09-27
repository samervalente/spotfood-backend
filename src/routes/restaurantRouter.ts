import { Router } from "express";

const routes = Router()

routes.post("/restaurants")
routes.get("/restaurants")
routes.get("/restaurants/:id")

export default routes