import { Restaurant, ProductType, Product } from "@prisma/client"
import * as clientService from "../../src/services/clientService"
import * as clientRepository from "../../src/repositories/clientRepository"
import clientFactory from "../factories/clientFactory"
import * as restaurantService from "../../src/services/restaurantService"
import * as restaurantRepository from "../../src/repositories/restaurantRepository"
import { createRestaurantData } from "../factories/restaurantFactory"
import * as productService from "../../src/services/productService"
import * as productRepository from "../../src/repositories/productRepository"
import {productFactory} from "../factories/productFatory"


type RestaurantDataType = Omit<Restaurant, "id" | "createdAt">
type ProductTypeDataType = Omit<ProductType, "createdAt">
type ProductDataType = Omit<Product, "id" | "createdAt">

describe("Testes para o clientService", () => {
    it("Chama a função insertClient do repositório do cliente caso os dados sejam válidos", async () => {
        const client = await clientFactory()

        jest.spyOn(clientRepository, 'getClientByEmail').mockResolvedValueOnce(null)
        jest.spyOn(clientRepository, 'insertClient').mockResolvedValueOnce()

        await clientService.registerClient(client)

        expect(clientRepository.insertClient).toBeCalled()

    })

    it("Chama a função conflictError caso já exista um cliente com o mesmo email", async () => {
        const client = await clientFactory()

        jest.spyOn(clientRepository, 'getClientByEmail').mockImplementationOnce((): any => {
            return {id: 1, ...client}
        })

        jest.spyOn(clientRepository, 'insertClient').mockResolvedValueOnce()
        const result = clientService.registerClient(client)
        const typeError = { type: "conflict", message:"Client already registered with this email."};

        expect(result).rejects.toEqual(typeError)
    }) 

    it("Retorna um token e os dados do cliente, caso estes sejam válidos", async () => {
        const client = await clientFactory()

        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id: 1, ...client})

        const data = await clientService.loginClient(1)
        expect(data.token).not.toBeNull()
        expect(data.name).not.toBeNull()
        expect(data.imageProfile).not.toBeNull()
    })

    it("Chama a função unauthorizedError caso as credenciais sejam inválidas", async () => {
        
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce(null)

        const result = clientService.loginClient(1)
        const typeError = { type: "unauthorized", message: "Client not authorized."};

        expect(result).rejects.toEqual(typeError)
    })

    it("Chama a função getClientCart do repositório do cliente e retorna o carrinho corretamente", async () => {
        const client = await clientFactory()
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id:1, ...client})
        jest.spyOn(clientRepository, 'getClientCart').mockResolvedValueOnce({totalValue: 30, products:[
            {name:"Churrasco", price:15},
            {name:"Sorvete", price:5},
            {name:"Refrigerante 2L", price: 10}
        ]})

        const cart = await clientService.getClientCart(1)
       
        expect(clientRepository.getClientCart).toBeCalled()
        expect(cart).toBeInstanceOf(Object)
        expect(cart.products).toBeInstanceOf(Array)
    })

    it("Chama a função notFoundError quando o cliente que faz a requisição não existe", async () => {
      
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce(null)
        
        const result =  clientService.getClientCart(2)
        const typeError = { type: "not_found", message: "Client not found"};

        expect(result).rejects.toEqual(typeError)
        
    })

    it("Chama a função getClientOrders do repositório do cliente e retorna o pedido corretamente", async () => {
        const client = await clientFactory()
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id:1, ...client})
        jest.spyOn(clientRepository, 'getClientOrders').mockImplementationOnce(():any => {
            return [
                {   order: "244233",
                    totalValue: 30, 
                    date:"05/10/2022",
                    products:[
                        {name:"Churrasco", price:15},
                        {name:"Sorvete", price:5},
                        {name:"Refrigerante 2L", price: 10}
                    ]
                }
            ]
        })

        const orders = await clientService.getClientOrders(1)
        expect(clientRepository.getClientOrders).toBeCalled()
        expect(orders).toBeInstanceOf(Object)
        expect(orders[0].products).toBeInstanceOf(Array)
    })

    it("Chama a função notFoundError quando o cliente que faz a requisição não existe", async () => {
      
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce(null)
        
        const result =  clientService.getClientOrders(2)
        const typeError = { type: "not_found", message: "Client not found"};

        expect(result).rejects.toEqual(typeError)
        
    })
})

beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
})

describe("Testes para o restaurantService", () => {
    it("Chama a função insertRestaurant caso o restaurante possua dados válidos", async () => {
        const restaurant: RestaurantDataType | any = await createRestaurantData()

        jest.spyOn(restaurantRepository,'getRestaurantByEmail').mockResolvedValue(null)
        jest.spyOn(restaurantRepository, "getRestauranteState").mockResolvedValueOnce({id:1, name:"Acre"})
        jest.spyOn(restaurantRepository, 'insertRestaurant').mockResolvedValueOnce()

        await restaurantService.registerRestaurant(restaurant)

        expect(restaurantRepository.insertRestaurant).toBeCalled()

    })

    it("Chama a funlão conflictError quando o email do restaurante já é existente", async () => {
        const restaurant: RestaurantDataType | any = await createRestaurantData()

        jest.spyOn(restaurantRepository,'getRestaurantByEmail').mockResolvedValue(restaurant)
        jest.spyOn(restaurantRepository, "getRestauranteState").mockResolvedValueOnce({id:1, name:"Acre"})
        jest.spyOn(restaurantRepository, 'insertRestaurant').mockResolvedValueOnce()

        const result =  restaurantService.registerRestaurant(restaurant)
        const typeError =  { type: "conflict", message:"Restaurant email already exists."};
        expect(result).rejects.toEqual(typeError)

    })

    it("Chama a função notFoundError quando o estado do restaurante não existe", async () => {
        const restaurant: RestaurantDataType | any = await createRestaurantData()

        jest.spyOn(restaurantRepository, "getRestauranteState").mockResolvedValue(null)
        
       const result = restaurantService.registerRestaurant(restaurant)
       const typeError = { type: "not_found", message: "State not found"};

        expect(result).rejects.toEqual(typeError)
    })

    it("Chama a função getAllRestaurants e retorna todos os restaurantes existentes no banco de dados", async () => {
        const restaurants = [{name:"Tacacá da Helem", state:"Pará", city:"Ananindeua"}, {name:"Churrasco de Duque de Caxias", state:"Rio De Janeiro", city:"Rio de Janeiro"}]

        jest.spyOn(restaurantRepository, 'getAllRestaurants').mockImplementationOnce(():any => {
            return restaurants
        })

        const allRestaurants = await restaurantService.getAllRestaurants()

        expect(restaurantRepository.getAllRestaurants).toBeCalled()
        expect(allRestaurants.length).toBe(2)
        expect(allRestaurants).toBeInstanceOf(Array)
    })

    it("Retorna um restaurante pelo id", async () => {
        const restaurant = {id: 1, name:"Tacacá da Helem", state:"Pará", city:"Ananindeua"}
        
        jest.spyOn(restaurantRepository,'getRestaurantById').mockImplementationOnce(():any => {
            return restaurant
        })

        const restaurantOnDB = await restaurantService.getRestaurantById(1, restaurant.id)

        expect(restaurantRepository.getRestaurantById).toBeCalled()
        expect(restaurantOnDB).toBeInstanceOf(Object)

    })

    it("Chama a função notFoundError caso o restaurante não exista", async () => {
        jest.spyOn(restaurantRepository,'getRestaurantById').mockImplementationOnce(():any => {
            return null
        })

        const result = restaurantService.getRestaurantById(1, 99)
        const typeError = { type: "not_found", message:"Restaurant not found." };
        expect(result).rejects.toEqual(typeError)
     })

     it("Retorna os restaurantes filtrados por estado e cidade", async () => {
        const restaurants = [{name:"Tacacá da Helem", state:"Pará", city:"Ananindeua"}, {name:"Churrasco de Duque de Caxias", state:"Rio De Janeiro", city:"Rio de Janeiro"}]

        jest.spyOn(restaurantRepository, 'filterRestaurants').mockImplementationOnce((): any => {
            return restaurants[1]
        })
        
        const state = "Rio De Janeiro"
        const city = "Rio De Janeiro"

        const restaurant = await restaurantService.filterRestaurants(state, city)

        expect(restaurantRepository.filterRestaurants).toBeCalled()
        expect(restaurant).toBeInstanceOf(Object)
        


     })
     
})

describe("Testes para o productService", () => {
    it("Registra um produto caso este possua dados válidos", async () => {
        const productType: ProductTypeDataType | any = {id:1, type:"Sushi"}

        const product: ProductDataType | any = await productFactory(productType.id)

        jest.spyOn(productRepository,'getProductType').mockResolvedValue(productType)
        jest.spyOn(productRepository, 'registerProduct').mockResolvedValueOnce()

        await productService.registerProduct(product)

        expect(productRepository.registerProduct).toBeCalled()

    })

    it("Chama a função notFoundError caso o tipo do produto não exista", async () => {

        const productType: ProductTypeDataType | any = {id:1, type:"Sushi"}
        const product: ProductDataType | any = await productFactory(productType.id)

        jest.spyOn(productRepository,'getProductType').mockResolvedValue(null)
        jest.spyOn(productRepository, 'registerProduct').mockResolvedValueOnce()

        const result = productService.registerProduct(product)
        const typeError = { type: "not_found", message: "Product type not found." };
        expect(result).rejects.toEqual(typeError)

    })

    it("Retorna um produto pelo id", async () => {
        const productType: ProductTypeDataType | any = {id:1, type:"Sobremesa"}
        const product: ProductDataType | any = await productFactory(productType.id)

        jest.spyOn(productRepository,'getProductById').mockResolvedValueOnce({id:1, ...product})

        const productOnDB = await productService.getProductById(1)

        expect(productRepository.getProductById).toBeCalled()
        expect(productOnDB).toBeInstanceOf(Object)
    
    })

    it("Chama a função notFoundError caso o id do produto não exista", async () => {
        jest.spyOn(productRepository,'getProductById').mockResolvedValue(null)
      

        const result = productService.getProductById(1)
        const typeError = { type: "not_found", message: "Product not found" };
        expect(result).rejects.toEqual(typeError)
    })

    it("Adiciona um produto ao carrinho caso os dados do produto e do cliente sejam válidos", async () => {
        const client = await clientFactory()
        const productType: ProductTypeDataType | any = {id:1, type:"Hambúrguer"}
        const product: ProductDataType | any = await productFactory(productType.id)
        const amount = 3

        jest.spyOn(productRepository, 'getProductById').mockResolvedValueOnce({id:1, ...product})
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id:1, ...client})
        jest.spyOn(productRepository, 'addProductToCart').mockResolvedValueOnce()

        await productService.addProductToCart(1, amount, 1)

        expect(productRepository.addProductToCart).toBeCalled()

    })

    it("Chama a função notFoundError caso o id do cliente não exista ao adicionar ao carrinho", async () => {
        const productType: ProductTypeDataType | any = {id:1, type:"Hambúrguer"}
        const product: ProductDataType | any = await productFactory(productType.id)
        const amount = 2

        jest.spyOn(productRepository,'getProductById').mockResolvedValue({id:1, ...product})
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValue(null)

        const result = productService.addProductToCart(1, amount, 999)
        const typeError = { type: "not_found", message: "Client not found" };

        expect(result).rejects.toEqual(typeError)
    })

    it("Remove um produto do carrinho caso os dados do produto e do cliente sejam válidos", async () => {
        const client = await clientFactory()
        const productType: ProductTypeDataType | any = {id:1, type:"Mariscos"}
        const product: ProductDataType | any = await productFactory(productType.id)
       
        jest.spyOn(productRepository, 'getProductById').mockResolvedValueOnce({id:1, ...product})
        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id:1, ...client})
        jest.spyOn(productRepository, 'removeProductFromCart').mockResolvedValueOnce()

        await productService.removeProductFromCart(1, 1)

        expect(productRepository.removeProductFromCart).toBeCalled()
    })

    it("Registra um pedido caso os dados dos produtos e do cliente sejam válidos", async () => {
        const client = await clientFactory()
        const products = [{name:"Sushi", price:15, rate:5}, {name:"Pizza 4 queijos tamanho família", price:32, rate:5}]

        jest.spyOn(clientRepository, 'getClientById').mockResolvedValueOnce({id:1, ...client})
        jest.spyOn(productRepository, 'registerPurchase').mockResolvedValueOnce()

        await productService.registerPurchase(products, 1)



    })
})