import Joi from "joi";
import {NextFunction, Response} from "express";
import {validate} from "../validate";

const createSchema = Joi.object({
    name: Joi.string().required(),
})

const updateSchema = Joi.object({
    name: Joi.string(),
})

export const validateCreateTodoList = async (req: any, res: Response, next: NextFunction) => {
    validate(req, res, next, createSchema);
}

export const validateUpdateTodoList = async (req: any, res: Response, next: NextFunction) => {
    validate(req, res, next, updateSchema);
}