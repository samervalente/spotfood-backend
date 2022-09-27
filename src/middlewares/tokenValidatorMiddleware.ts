import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"
import * as authService from "../services/clientService"

import dotenv from "dotenv"

dotenv.config()

export default async function tokenValidator(req: Request, res: Response, next: NextFunction){

    const authorization = req.headers['authorization'];
    if (!authorization) throw {type:"unauthorized", message:"Missing authorization header"}
  
    const token = authorization.replace('Bearer ', '');
    if (!token) throw {type:"unauthorized", message:"Missing token"}
  
    try {
      const JWT_SECRET = String(process.env.JWT_SECRET);
      const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };

      const user = await authService.getUserById(userId)
      res.locals.user = user;
      
      next();
    } catch {
      throw {type:"unauthorized", message:"Invalid Token"}
    }
}