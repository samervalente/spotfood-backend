import prisma from "../../src/database/prisma";
import connection from "../../src/database/postgres";

export async function resetDatabase(){
    await prisma.$executeRaw`TRUNCATE TABLE states, clients, orders, carts, restaurants, adresses, products, "cartProducts", "orderProducts", "productTypes" RESTART IDENTITY`
}


export async function populateDatabaseWithStates(){
    const statesQuery = `INSERT INTO states (id, name) VALUES
    (1, 'Acre'),
    (2, 'Alagoas'),
    (3, 'Amazonas'),
    (4, 'Amapá'),
    (5, 'Bahia'),
    (6, 'Ceará'),
    (7, 'Distrito Federal'),
    (8, 'Espírito Santo'),
    (9, 'Goiás'),
    (10, 'Maranhão'),
    (11, 'Minas Gerais'),
    (12, 'Mato Grosso do Sul'),
    (13, 'Mato Grosso'),
    (14, 'Pará'),
    (15, 'Paraíba'),
    (16, 'Pernambuco'),
    (17, 'Piauí'),
    (18, 'Paraná'),
    (19, 'Rio de Janeiro'),
    (20, 'Rio Grande do Norte'),
    (21, 'Rondônia'),
    (22, 'Roraima'),
    (23, 'Rio Grande do Sul'),
    (24, 'Santa Catarina'),
    (25, 'Sergipe'),
    (26, 'São Paulo'),
    (27, 'Tocantins');`
    
    await connection.query(statesQuery)
}