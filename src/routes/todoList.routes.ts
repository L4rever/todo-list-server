import {Router} from "express";
import verifyUserToken from "../middlewares/verifyUserToken";
import {validateCreateTodo, validateUpdateTodo} from "../middlewares/validators/todo.validators";
import todoController from "../controllers/todo.controller";
import todoListController from "../controllers/todoList.controller";
import {validateCreateTodoList, validateUpdateTodoList} from "../middlewares/validators/todoList.validators";

class TodoListRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/create', verifyUserToken, validateCreateTodoList, todoListController.create);
        this.router.put('/update/:id', verifyUserToken, validateUpdateTodoList, todoListController.update);
        this.router.delete('/delete/:id', verifyUserToken, todoListController.delete);
        this.router.get('/getById/:id', verifyUserToken, todoListController.getById);
        this.router.get('/getByUserId', verifyUserToken, todoListController.getByUserId);
    }
    getRouter() {
        return this.router
    }
}

export default new TodoListRouter();