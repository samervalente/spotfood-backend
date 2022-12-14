import { Request, Response } from "express";
import * as restaurantService from "../services/restaurantService"

export async function registerRestaurant(req: Request, res:Response){
    const restaurantRegisterData = req.body

    await restaurantService.registerRestaurant(restaurantRegisterData)

    res.status(201).send("Restaurant created successfully.")

}

export async function listRestaurants(req: Request, res:Response){
    const restaurants = await restaurantService.getAllRestaurants()
    res.status(200).send(restaurants)
}


export async function getRestaurantProducts(req: Request, res:Response){
    const restaurantId = Number(req.params.id)
    const clientId = res.locals.userId
    const restaurant = await restaurantService.getRestaurantProducts(clientId,restaurantId)

    res.status(200).send(restaurant)
}

export async function getRestaurantById(req: Request, res:Response){
    const restaurantId = Number(req.params.id)

    const restaurant = await restaurantService.getRestaurantById(restaurantId)
    res.status(200).send(restaurant)
}

export async function filterRestaurants(req: Request, res:Response){
    const state = String(req.query.state)
    const city = String(req.query.city)
    
    const restaurants = await restaurantService.filterRestaurants(state, city)
    
    res.status(200).send(restaurants)
}
