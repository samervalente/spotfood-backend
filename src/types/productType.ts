import { Product } from "@prisma/client"
export type ProductDataType = Omit<Product, "id" | "createdAt">

