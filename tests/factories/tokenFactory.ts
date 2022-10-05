import app from "../../src/app";
import supertest from "supertest";
import clientFactory from "./clientFactory";
import { faker } from "@faker-js/faker";
import prisma from "../../src/database/prisma";
const agent = supertest(app)


export  async function clientTokenFactory(){
    const client = await clientFactory()
    await agent.post("/clients").send(client)
    const {email, password} = client
    const clientLoginData = {email, password}

    const {body} = await agent.post("/clients/login").send(clientLoginData)
    const token = `Bearer ${body.token}`

    return token
}

export async function restaurantTokenFactory(){
    const restaurantDataType = {
        name:faker.company.name(),
        email:faker.internet.email(),
        imageProfile:faker.internet.avatar(),
        password:faker.internet.password(),
        city:"Ananindeua",
        stateId:1
    }

    await agent.post("/restaurants").send(restaurantDataType)
    const {email, password} = restaurantDataType
    const restaurantLoginData = {email, password}
   
    const {body} = await agent.post("/restaurants/login").send(restaurantLoginData)
    const token = `Bearer ${body.sessionToken}`

    return token
}