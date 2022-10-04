import { wrongSchemaError } from "../utils/errorUtils"
import {Request, Response, NextFunction} from "express"


 interface IDeital{
    message: string
 }

export default function schemaValidator(schema: any){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body)
        if(error){
            const errors = error.details.map((detail: IDeital) => detail.message)
            throw wrongSchemaError(errors)
        }
        next()
    }
}