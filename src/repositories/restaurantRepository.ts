import prisma from "../database/prisma"
import connection from "../database/postgres"
import {RestaurantDataType} from "../types/restaurantType"
import { resourceUsage } from "process";


interface IProduct{
    restaurantName:string;
    city:string;
    productName:string;
    price:number;
    rate:number;
    category:number;
}


export async function insertRestaurant(userData: RestaurantDataType){
    return await prisma.restaurant.create({data: userData})
}

export async function getAllRestaurants(){
    const restaurants = await prisma.restaurant.findMany({select:{id:true, name:true, city:true, imageProfile:true, states:{select:{name:true}}}})

    return restaurants
}

export async function getRestaurantById(id: number){
    const {rows: restaurant} = await connection.query(`SELECT r.name as "restaurantName", r.city, r."imageProfile", p.name as "productName", p.price, p.rate, p."imageUrl", p.description, pt.type as category, p.id as "productId" FROM products p
    JOIN "productTypes" pt
    ON p."typeId" = pt.id
    JOIN restaurants r
    ON p."restaurantId" = r.id
    WHERE p."restaurantId" = $1`,[id])

    if(restaurant.length > 0){
        const formatedOutput = await formatOutput(restaurant)
        return formatedOutput
    }
    return restaurant
}


async function formatOutput(restaurant: any){
    const {restaurantName, city, imageProfile} = restaurant[0]
    let products = []
    const categories: any = ["Pratos Feitos, Sobremesas, Churrascos, Mariscos, Sushis, Bebidas, Pizzas, Hambúrgueres"]
    
    for(let i = 0; i < restaurant.length; i ++){
        if(!categories.includes(restaurant[i].category)){
            const category = restaurant[i].category
            categories.push(category)
            products.push({category, products:[]})
        }
    }

 
    for(let i = 0; i < restaurant.length; i ++){
        for(let j = 0; j < products.length;  j++){
            if(restaurant[i].category === products[j].category){
              products[j] = {...products[j], products:[...products[j].products, restaurant[i]]}
               
            }
        }
    }
   

    return {restaurantName, city, imageProfile, products}
}

export async function getRestaurantByEmail(email: string){
    const restaurant = await prisma.restaurant.findFirst({where: {email}})
    return restaurant
}

export async function getRestaurantByName(name:string){
    const restaurant = await prisma.restaurant.findFirst({where:{name}})
    return restaurant
}

export async function getRestauranteState(stateId: number){
    const state = await prisma.state.findFirst({where:{id:stateId}})
    return state
}

export async function filterRestaurants(state: string, city: string){
    const {rows: restaurants} = await connection.query(`SELECT r.name, r.city, s.name FROM restaurants r
    JOIN states s
    ON s.id = r."stateId"
    WHERE s.name = $1 AND r.city = $2
    `,[state, city])

    return restaurants
}
