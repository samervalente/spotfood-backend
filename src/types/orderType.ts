import { Order } from "@prisma/client";


export type OrderDataType = Omit<Order, "id" | "totalPrice" | "createdAt">