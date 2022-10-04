import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/prisma";
import { resetDatabase, populateDatabaseWithStates } from "../factories/DatabaseUtils";
import productFactory from "../factories/productFatory";
import restaurantFactory from "../factories/restaurantFactory";
import typeFactory from "../factories/typeFactory"
import tokenFactory from "../factories/tokenFactory";

beforeEach(async () => {
   await resetDatabase()
   await populateDatabaseWithStates()
})

const agent = supertest(app)

describe("Testa a rota de criação de produtos", () => {
    it("Retorna 201 caso os dados de criação sejam válidos", async () => {
        const restaurant: any = await restaurantFactory()
        const restaurantLoginData = {email: restaurant.email, password: restaurant.password}
        const token = await tokenFactory(restaurantLoginData)

        const type: any = await typeFactory()
        const product = await productFactory(type.id)
        
        const {status} = await agent.post("/products").set({authorization:token}).send(product)

        expect(status).toBe(201)

    })

    it("Retorna 404 quando a categoria do produto não existe", async () => {
        const restaurant: any = await restaurantFactory()
        console.log(restaurant)
        const restaurantLoginData = {email: restaurant.email, password: restaurant.password}
        const token = await tokenFactory(restaurantLoginData)
        console.log(token)
        const type = {id:9999, name:"invalidType"}
        const product = await productFactory(type.id)

        const {status} = await agent.post("/products").set({authorization:token}).send(product)
        expect(status).toBe(404)

    })
})

afterAll(() => {
    prisma.$disconnect()
})