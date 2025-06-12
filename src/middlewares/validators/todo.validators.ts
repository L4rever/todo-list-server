import Joi from "joi";
import {NextFunction, Response} from "express";
import {validate} from "../validate";

const createSchema = Joi.object({
    text: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
    todoListId: Joi.number().required(),
})

const updateSchema = Joi.object({
    text: Joi.string(),
    isCompleted: Joi.boolean(),
    todoListId: Joi.number(),
})

export const validateCreateTodo = async (req: any, res: Response, next: NextFunction) => {
    validate(req, res, next, createSchema);
}

export const validateUpdateTodo = async (req: any, res: Response, next: NextFunction) => {
    validate(req, res, next, updateSchema);
}

