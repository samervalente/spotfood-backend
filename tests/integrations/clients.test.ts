import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/prisma";
import clientFactory from "../factories/clientFactory";


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE clients, carts, orders, "cartProducts","orderProducts" RESTART IDENTITY`
})

const agent = supertest(app)

describe("Testes para a rota de registro de clientes", () => {
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

afterAll(() => {
    prisma.$disconnect()
})