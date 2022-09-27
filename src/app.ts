import express from "express"
import cors from "cors"
import "express-async-errors"
import routes from "./routes/index"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware"

const app = express()
app.use([cors(), express.json()])

app.use(routes)
app.use(errorHandlerMiddleware)

export default app

