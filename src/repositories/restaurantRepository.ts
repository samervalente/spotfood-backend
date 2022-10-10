import prisma from "../database/prisma"
import connection from "../database/postgres"
import {RestaurantDataType} from "../types/restaurantType"
import * as clientRepository from "./clientRepository"

interface IProduct{
    restaurantName:string;
    city:string;
    productName:string;
    price:number;
    rate:number;
    category:number;
}


export async function insertRestaurant(userData: RestaurantDataType){
     await prisma.restaurant.create({data: userData})
}

export async function getAllRestaurants(){
    const {rows: restaurants} = await connection.query(`
    SELECT r.id, r.name, r."imageProfile", r.city, s.name as state FROM restaurants r
    JOIN states s
    ON s.id = r."stateId"
    `)
    return restaurants
}

export async function getRestaurantProducts(clientId: number, id: number){
    const {rows: restaurant} = await connection.query(`SELECT p.name as "productName", p.price, p.rate, p."imageUrl", p.description, pt.type as category, p.id as "productId" FROM products p
    JOIN "productTypes" pt
    ON p."typeId" = pt.id
    JOIN restaurants r
    ON p."restaurantId" = r.id
    WHERE p."restaurantId" = $1`,[id])

    if(restaurant.length > 0){
       
        const cart = await clientRepository.getClientCart(clientId)
       
        const formatedOutput = await formatOutput(cart, restaurant, clientId)
        return formatedOutput
    }
    return restaurant
}


export async function getRestaurantById(restaurantId: number){
    const {rows: restaurant} = await connection.query(`
    SELECT r.name, r."imageProfile", s.name as state, r.city FROM restaurants r
    JOIN states s
    ON s.id = r."stateId"
    WHERE r.id  = $1
    `,[restaurantId])

    return restaurant
}

async function formatOutput(cart: any, restaurant: any, clientId:number){
    const {restaurantName, city, imageProfile} = restaurant[0]
    let productsCategorie: any = []
    const categories: any = ["Pratos Feitos, Sobremesas, Churrascos, Mariscos, Sushis, Bebidas, Pizzas, Hambúrgueres"]
    
    for(let i = 0; i < restaurant.length; i ++){
        if(!categories.includes(restaurant[i].category)){
            const category = restaurant[i].category
            categories.push(category)
            productsCategorie.push({category, products:[]})
        }
    }
  

    for(let i = 0; i < restaurant.length; i ++){
        for(let j = 0; j < productsCategorie.length;  j++){
            const category = productsCategorie[j].category
            if(restaurant[i].category === category){
                const {productName, price, rate, imageUrl, description, productId} = restaurant[i]
                let product: any = {productName, price, rate, imageUrl, description, productId}
               if(cart.cartProducts && cart.cartProducts.length > 0){
                let hash:any = {}
                for(let k = 0 ; k < cart.cartProducts.length; k ++){
                    const {productId} = cart.cartProducts[k]
                    hash[productId] = productId
                }

                if(hash[productId] && clientId === cart.clientId){
                    product = {...product, inCart:true}
                    productsCategorie[j].products.push(product)
                }else{
                    product = {...product, inCart:false}
                    productsCategorie[j].products.push(product)
                }
               }else{
                product = {...product, inCart:false}
                productsCategorie[j].products.push(product)
            }
            }
            
        }
    }
   
   
    return {clientId, restaurantName, city, imageProfile, productsCategorie}
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
    const state = await prisma.state.findFirst({where:{id:stateId}, select:{id:true, name:true}})
    return state
}

export async function filterRestaurants(state: string, city: string){
    const {rows: restaurants} = await connection.query(`
    SELECT r.id, r.name, r."imageProfile", r.city, s.name as state FROM restaurants r
    JOIN states s
    ON s.id = r."stateId"
    WHERE s.name = $1 AND r.city = $2
    `,[state, city])

    return restaurants
}
