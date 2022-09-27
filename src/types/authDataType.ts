import { Client } from "@prisma/client"
export type AuthDataType = Omit<Client, "id" | "name" | "imageProfile" | "cpf"  | "createdAt">
