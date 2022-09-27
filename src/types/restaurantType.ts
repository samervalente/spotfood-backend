import { Restaurant } from "@prisma/client"
export type RestaurantDataType = Omit<Restaurant, "id" | "createdAt">

