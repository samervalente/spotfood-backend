import app from "../../src/app";
import supertest from "supertest";
import clientFactory from "./clientFactory";
const agent = supertest(app)


export default async function tokenFactory(){
    const client = await clientFactory()
    await agent.post("/clients").send(client)
    const {email, password} = client
    const clientLoginData = {email, password}

    const {body} = await agent.post("/clients/login").send(clientLoginData)
    const token = `Bearer ${body.token}`

    return token
}