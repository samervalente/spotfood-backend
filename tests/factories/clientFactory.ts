import { faker } from "@faker-js/faker";

export default async function clientFactory(){
    const client = {
        name:faker.name.fullName(),
        imageProfile:faker.internet.avatar(),
        email:faker.internet.email(),
        password:faker.internet.password()
    }

    return client
}