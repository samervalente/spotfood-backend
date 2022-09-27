import { Client } from "@prisma/client"
export type ClientDataType = Omit<Client, "id" | "createdAt">

