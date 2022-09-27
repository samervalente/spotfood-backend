type ErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema"

export interface IAppError {
    type: ErrorTypes;
    message:string;
}

export function isAppError(error: object): error is IAppError{
    return (error as IAppError).type !== undefined
}

export function errorTypeToStatusCode(type: ErrorTypes){
    switch(type){
        case "conflict": return 409;
        case "not_found": return 404;
        case "unauthorized": return 401;
        case "wrong_schema": return 422;

        default: return 400;
    }  
}

export function conflictError(message?: string): IAppError {
    return { type: "conflict", message: message ?? "" };
  }
  
  export function notFoundError(message?: string): IAppError {
    return { type: "not_found", message: message ?? "" };
  }
  
  export function unauthorizedError(message?: string): IAppError {
    return { type: "unauthorized", message: message ?? "" };
  }
  
  export function wrongSchemaError(message?: string): IAppError {
    return { type: "wrong_schema", message: message ?? "" };
  }