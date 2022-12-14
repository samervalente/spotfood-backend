import joi from "joi"


const clientSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    imageProfile: joi.string().required(),
    password: joi.string().required()
})

export default clientSchema