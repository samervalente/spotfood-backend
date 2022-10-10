import express from "express"
import cors from "cors"
import "express-async-errors"
import routes from "./routes/index"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware"

const app = express()
const corsOptions = {
    origin: ["http://localhost:3000", "https://spotfood-frontend.vercel.app/"],
    allowedHeaders: "Access-Control-Allow-Origin"
}
app.options("*",cors())
app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)
app.use(errorHandlerMiddleware)

export default app

