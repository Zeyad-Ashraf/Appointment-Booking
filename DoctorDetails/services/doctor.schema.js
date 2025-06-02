import joi from 'joi';
import genralRules from '../../utils/generalRules/index.js';



export const addDoctorSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(15).required(),
        lastName: joi.string().min(3).max(15).required(),
        speciality: joi.string().min(3).max(30).required(),
        email: joi.string().email({tlds:true}).required(),
        location: joi.string().min(24).max(24).required(),
        address : joi.string().min(10).max(50).required(),
        experience : joi.number().min(1).max(50).required(),
        fees: joi.number().min(100).max(5000).required(),
        aboutDoctor: joi.string().min(10).max(1000).required()
    }),
    file: joi.object().optional(),
}


export const updateDoctorSchema = {
    body: joi.object({
        speciality: joi.string().min(3).max(15),
        email: joi.string().email({tlds:true}),
    }),
    params: joi.object({
        id: genralRules.objectId.required()
    }),
    headers: genralRules.headers.required(),
}