import app from "../../src/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { populateDatabaseWithRestaurants } from "../factories/restaurantFactory";
import {resetDatabase, populateDatabaseWithStates} from "../factories/DatabaseUtils"
import tokenFactory from "../factories/tokenFactory";
import prisma from "../../src/database/prisma"

beforeEach(async () => {
    await resetDatabase()
    await populateDatabaseWithStates()
 })

const agent = supertest(app)

describe("Testa a rota de criação de restaurantes", () => {
    it("Retorna 201 quando os dados de criação são válidos", async () => {
        const restaurantDataType = {
            name:faker.company.name(),
            email:faker.internet.email(),
            imageProfile:faker.internet.avatar(),
            password:faker.internet.password(),
            city:"Ananindeua",
            stateId:1
        }

        const {status} = await agent.post("/restaurants").send(restaurantDataType)
        expect(status).toBe(201)
    })

    it("Retorna 404 quando o id do estado é inválido", async () => {
        const restaurantDataType = {
            name:faker.company.name(),
            email:faker.internet.email(),
            imageProfile:faker.internet.avatar(),
            password:faker.internet.password(),
            city:"Ananindeua",
            stateId:999
        }

        const {status} = await agent.post("/restaurants").send(restaurantDataType)
        expect(status).toBe(404)
    })

    it("Retorna 422 quando o body é inválido", async () => {
        const restaurantDataType = {
            name:2,
            email:"invalidEmail",
            imageProfile:faker.internet.avatar(),
            password:faker.internet.password(),
            city:"Ananindeua",
            stateId:999
        }

        const {status} = await agent.post("/restaurants").send(restaurantDataType)
        expect(status).toBe(422)
    })
})

describe("Testa a rota de listagem e filtragem de restaurants", () => {
    it("Retorna a lista de restaurantes quando o token do cliente é válido", async () => {
        await populateDatabaseWithRestaurants(5)
        const token = await tokenFactory()
        
        const {body} =  await agent.get("/restaurants").set({authorization:token})

        expect(body).toBeInstanceOf(Array)
        expect(body.length).toEqual(5)
        
    })

    it("Retorna 401 quando o token do cliente é inválido", async () => {
        const token = "invalidToken"

        const {status} = await agent.get("/restaurants").set({authorization:token})

        expect(status).toBe(401)
        
    })

    it("Retorna 200 e um restaurante pelo id", async () => {
        await populateDatabaseWithRestaurants(7)
        const token = await tokenFactory()

        const restaurants = await prisma.restaurant.findMany()
       
        const {status} = await agent.get(`/restaurants/${restaurants[0].id}`).set({authorization:token})
      
        expect(status).toBe(200)
    })

     it("Retorna 200 e os restaurantes filtrados por estado e cidade", async () => {
        await populateDatabaseWithRestaurants(7)
        const token = await tokenFactory()

        const {status, body} = await agent.get("/restaurants/filter?state=Acre&city=Ananindeua").set({authorization:token})

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
     })   

})