import joi from "joi";
import { Types } from "mongoose";

const customId = (value, helper) => {
    let valid = Types.ObjectId.isValid(value);
    return valid ? value : helper.message("invalid id");
}
const genralRules = {
    objectId: joi.string().custom(customId).hex(),
    email: joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 4 }),
    password: joi.string().min(8).max(30),
    headers:joi.object({
        authorization: joi.string().required(),
        'cache-control':joi.string(),
        'postman-token':joi.string(),
        'content-type':joi.string(),
        'content-length':joi.string(),
        host:joi.string(),
        'user-agent':joi.string(),
        accept:joi.string(),
        'accept-encoding':joi.string(),
        connection:joi.string(),
    })
}

export default genralRules;