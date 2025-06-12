import todoService from "../services/todo.service";
import {Response, NextFunction} from "express";
import TodoDTO from "../types/todoDTO";
import TodoService from "../services/todo.service";
import {Errors} from "../types/errors";

class TodoController{
    async create(req: any, res: Response, next: NextFunction) {
        const todo: TodoDTO = req.body;
        const createdTodo = await TodoService.create(todo);
        res.status(201).json(createdTodo);
    };
    async update(req: any, res: Response, next: NextFunction){
        const todo: TodoDTO = req.body;
        const id = req.params?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            const updatedTodo = await TodoService.update(id, todo);
            res.status(200).json(updatedTodo)
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
    async delete(req: any, res: Response, next: NextFunction) {
        const id = req.params?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            await TodoService.delete(id);
            res.sendStatus(200)
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
    async getById(req: any, res: Response, next: NextFunction) {
        const id = req.params?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            const foundTodo = await TodoService.getById(id);
            res.status(200).json(foundTodo);
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
    async getByTodoListId(req: any, res: Response, next: NextFunction) {
        const id = req.query?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            const foundTodo = await TodoService.getByTodoListId(id);
            res.status(200).json(foundTodo);
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
}

export default new TodoController();