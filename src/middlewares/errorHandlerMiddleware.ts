import {Request, Response, NextFunction} from "express"

import { IAppError, errorTypeToStatusCode, isAppError } from "../utils/errorUtils"


export function errorHandlerMiddleware(
err: Error | IAppError,
req: Request, 
res: Response,
next:NextFunction){
   
    if(isAppError(err)){
        return res.status(errorTypeToStatusCode(err.type)).send(err.message)
    }
    console.log(err)
    return res.sendStatus(500)
}