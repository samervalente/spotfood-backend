import joi from "joi"


const productSchema = joi.object({
    name: joi.string().required(),
    price:joi.string().min(11).max(11).required(),
    imageUrl: joi.string().email().required(),
    typeId: joi.string().required()
})

export default productSchema