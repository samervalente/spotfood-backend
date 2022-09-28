import joi from "joi"


const productSchema = joi.object({
    name: joi.string().required(),
    price:joi.number().required(),
    imageUrl: joi.string().required(),
    typeId: joi.number().required(),
    rate:joi.number(),
    description:joi.string()
})

export default productSchema