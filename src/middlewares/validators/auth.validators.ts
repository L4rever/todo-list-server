import Joi from "joi"
import {Response, NextFunction} from "express";
import {validate} from "../validate";

const registerSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
})

const loginSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
})

export async function validateRegister(req: any, res: Response, next: NextFunction) {
    validate(req,res,next, registerSchema);
}

export async function validateLogin(req: any, res: Response, next: NextFunction) {
    validate(req,res,next, loginSchema);
}