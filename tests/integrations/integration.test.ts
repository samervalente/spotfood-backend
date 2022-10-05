import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/prisma";

import { faker } from "@faker-js/faker";
import clientFactory from "../factories/clientFactory";
import { populateDatabaseWithRestaurants } from "../factories/restaurantFactory";
import {resetDatabase, populateDatabaseWithStates} from "../factories/DatabaseUtils"
import {clientTokenFactory} from "../factories/tokenFactory";
import {productFactory, populateDatabaseWithProducts } from "../factories/productFatory";
import typeFactory from "../factories/typeFactory"

const agent = supertest(app)

describe("Testes para a rota de registro de clientes", () => {
    beforeEach(async () => {
        await resetDatabase()
     })
    it("Retorna 201 e cria um cliente com dados válidos", async () => {
        const client = await clientFactory()

        const {status} = await agent.post("/clients").send(client)
        const clientOnDB = await prisma.client.findFirst({where:{email:client.email}})

        expect(status).toBe(201)
        expect(clientOnDB).toBeInstanceOf(Object)
        expect(clientOnDB).not.toBeNull()
    })

    it("Retorna 409 ao tentar criar um cliente com email já existente", async () => {
        const client = await clientFactory()
        
        await agent.post("/clients").send(client)
        const {status} = await agent.post("/clients").send(client)
        
        expect(status).toBe(409)
    })

    it("Retorna 422 ao tentar criar um cliente com dados inválidos", async () => {
        let client: any = await clientFactory()
        client = {...client, name:2, email:"invalidEmail" }

        const {status} = await agent.post("/clients").send(client)
        expect(status).toBe(422)
    })

})

describe("Testes para a rota de login de clientes", () => {
    it("Retorna 200 e um token válido junto com os dados do usuário, caso estes sejam válidos", async () =>{
        const client = await clientFactory()

        await agent.post("/clients").send(client)

        const clientLoginData = {email: client.email, password: client.password}
        const {body, status} = await agent.post("/clients/login").send(clientLoginData)
      
        expect(status).toBe(200)
        expect(body.name).not.toBeNull()
        expect(body.imageProfile).not.toBeNull()
        expect(body.token).not.toBeNull()

    })

    it("Retorna 401 caso as credenciais do usuário sejam inválidas", async () => {
        const client = await clientFactory()
        await agent.post("/clients").send(client)

        const clientLoginData = {email: "invalidEmail@gmail.com", password: "incorrectPassword"}
        const { status} = await agent.post("/clients/login").send(clientLoginData)

        expect(status).toBe(401)
    })
})

describe("Testes para a rota de visualização do carrinho do cliente", () => {
    it("Retorna o carrinho do usuário caso o token do cliente seja válido", async () => {
        const client = await clientFactory()
        await agent.post("/clients").send(client)

        const clientLoginData = {email: client.email, password: client.password}
        const {body} = await agent.post("/clients/login").send(clientLoginData)
        
        const token = `Bearer ${body.token}`
        const {status} = await agent.get("/clients/carts").set({authorization: token})

        expect(status).toBe(200)
    })

    it("Retorna 401 caso o token do cliente seja inválido", async () => {
    
        const token = "invalidToken"
        const {status} = await agent.get("/clients/carts").set({authorization: token})

        expect(status).toBe(401)
    })
})

describe("Testes para a rota de visualização dos pedidos do cliente", () => {
    it("Retorna os pedidos do usuário caso o token do cliente seja válido", async () => {
        const client = await clientFactory()
        await agent.post("/clients").send(client)

        const clientLoginData = {email: client.email, password: client.password}
        const {body} = await agent.post("/clients/login").send(clientLoginData)
        
        const token = `Bearer ${body.token}`
        const {status} = await agent.get("/clients/orders").set({authorization: token})

        expect(status).toBe(200)
    })

    it("Retorna 401 caso o token do cliente seja inválido", async () => {
    
        const token = "invalidToken"
        const {status} = await agent.get("/clients/orders").set({authorization: token})

        expect(status).toBe(401)
    })
})

//products
describe("Testes para a rota de criação de produtos", () => {
    beforeEach(async () => {
        await resetDatabase()
        await populateDatabaseWithStates()
     })

    it("Retorna 401 quando o token do restaurante é inválido", async () => {
        const token = "invalidToken"
        const type: any = await typeFactory()
        const product = await productFactory(type.id)

        const {status} = await agent.post("/products").set({authorization:token}).send(product)
        
        expect(status).toBe(401)
    })
   
})

describe("Testes para a rota de listagem de produtos", () => {
    beforeEach(async () => {
        await resetDatabase()
        await populateDatabaseWithStates()
     })

    it("Retorna 200 e um produto pelo id", async () => {
        const token = await clientTokenFactory()
        await populateDatabaseWithRestaurants(3)
        const type: any = await typeFactory()
        const products = await populateDatabaseWithProducts(type.id, 3)
        const productId = products[0].id

        const {status, body} = await agent.get(`/products/${productId}`).set({authorization:token})

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).not.toBeNull()

    })

    it("Retorna 404 quando o produto não existe", async () => {
        const token = await clientTokenFactory()
        await populateDatabaseWithRestaurants(3)
        const productId = 9999

        const {status} = await agent.get(`/products/${productId}`).set({authorization:token})

        expect(status).toBe(404)
        
    })
})

//restaurants
describe("Testa a rota de criação de restaurantes", () => {
    beforeEach(async () => {
        await resetDatabase()
        await populateDatabaseWithStates()
     })

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
    beforeEach(async () => {
        await resetDatabase()
        await populateDatabaseWithStates()
     })
    it("Retorna a lista de restaurantes quando o token do cliente é válido", async () => {
        await populateDatabaseWithRestaurants(5)
        const token = await clientTokenFactory()
        
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
        const token = await clientTokenFactory()

        const restaurants = await prisma.restaurant.findMany()
       
        const {status} = await agent.get(`/restaurants/${restaurants[0].id}`).set({authorization:token})
      
        expect(status).toBe(200)
    })

     it("Retorna 200 e os restaurantes filtrados por estado e cidade", async () => {
        await populateDatabaseWithRestaurants(7)
        const token = await clientTokenFactory()

        const {status, body} = await agent.get("/restaurants/filter?state=Acre&city=Ananindeua").set({authorization:token})

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
     })   

})

afterAll(async () => {
    await resetDatabase()
    prisma.$disconnect()
})