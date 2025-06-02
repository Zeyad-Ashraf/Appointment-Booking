import joi from "joi";
import genralRules from "../../utils/generalRules/index.js";

export const userSignUpSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(15).message("firstName must br at least 3 characters").required(),
        lastName: joi.string().min(3).max(15).message("lastName must be at least 3 characters").required(),
        userName: joi.string().min(3).max(15).required(),
        email: genralRules.email.message("invalid email").required(),
        password: genralRules.password.message("password must contain at least 8 characters").required(),
    })
}

export const userSignInSchema = {
    body: joi.object({
        email: genralRules.email.required(),
        password: genralRules.password.required()
    })
}
