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

    return res.sendStatus(500)
}