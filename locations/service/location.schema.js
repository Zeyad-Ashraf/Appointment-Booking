import joi from "joi";
import genralRules from "../../utils/generalRules/index.js";

export const addLocationSchema = {
    body: joi.object({
        name: joi.string().required()
    })
}

export const deleteLocationSchema = {
    params: joi.object({
        id: genralRules.objectId.required()
    })
}