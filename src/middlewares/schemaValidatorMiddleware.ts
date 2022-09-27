import {Request, Response, NextFunction} from "express"

 interface IDeital{
    message: string
 }

export default function schemaValidator(schema: any){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body)
        if(error){
            const errors: string[] = error.details.map((detail: IDeital) => detail.message)
            throw {type:"invalid_body", message:errors}
        }
        next()
    }
}