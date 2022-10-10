import express from "express"
import cors from "cors"
import "express-async-errors"
import routes from "./routes/index"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware"

const app = express()
app.options('*', cors())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))
app.use(express.json())

app.use(routes)
app.use(errorHandlerMiddleware)

export default app

