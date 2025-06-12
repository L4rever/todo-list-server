import {Response, NextFunction} from "express";
import TodoListService from "../services/todoList.service";
import {TodoListDTO} from "../types/todoListDTO";
import {Errors} from "../types/errors";
import todoService from "../services/todo.service";

class TodoListController {
    async create(req: any, res: Response, next: NextFunction) {
        const todoList: TodoListDTO = {name: req.body.name, userId: req.user.id}
        const createdTodoList = await TodoListService.create(todoList);
        res.status(201).json(createdTodoList);
    };

    async update(req: any, res: Response, next: NextFunction){
        const todoList: TodoListDTO = req.body;
        const id = req.params?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            const updatedTodoList = await TodoListService.update(id, todoList);
            res.status(200).json(updatedTodoList)
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    }
    async delete(req: any, res: Response, next: NextFunction) {
        const id = req.params?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            await TodoListService.delete(id);
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
            const [foundTodoList] = await TodoListService.getById(id);
            const todos= await todoService.getByTodoListId(id);
            res.status(200).json({TodoList: foundTodoList, todos});
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
    async getByUserId(req: any, res: Response, next: NextFunction) {
        const id = req.query?.id;
        try {
            if (!id) {
                throw new Error(Errors.REQUIRED_ID)
            }
            const foundTodoList = await TodoListService.getByUserId(id);
            res.status(200).json(foundTodoList);
        }
        catch (e: any) {
            res.status(400).json(e.message);
        }
    };
}

export default new TodoListController();