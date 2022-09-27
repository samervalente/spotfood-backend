import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"
import * as restaurantService from "../services/restaurantService"
import * as clientService from "../services/clientService"

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

      let user;;

      const restaurant = await restaurantService.getRestaurantById(userId)
      const client = await clientService.getClientById(userId)
      
      restaurant? user = restaurant : user = client

      if(!user){
        throw {type:"unauthorized", message:"Invalid Token"}
      }
     
      res.locals.user = user.id;
      
      next();
    } catch {
      throw {type:"unauthorized", message:"Invalid Token"}
    }
}