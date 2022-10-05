import * as clientService from "../../src/services/clientService"
import * as clientRepository from "../../src/repositories/clientRepository"
import clientFactory from "../factories/clientFactory"
import * as restaurantService from "../../src/services/restaurantService"
import * as productService from "../../src/services/productService"



describe("Testes para o serviço de registar o usuário", () => {
    it("Chama a função insertClient do repositório do cliente caso os dados sejam válidos", async () => {
        const client = await clientFactory()
        jest.spyOn(clientRepository, "insertClient").mockResolvedValueOnce()

        await clientService.registerClient(client)

        expect(clientRepository.insertClient).toBeCalled()

    })

    it("")
})