import {Router} from "express";
import {validateCreateTodo, validateUpdateTodo} from "../middlewares/validators/todo.validators";
import verifyUserToken from "../middlewares/verifyUserToken";
import todoController from "../controllers/todo.controller";

export class TodoRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }
    #initializeRoutes() {
        this.router.post('/create', verifyUserToken, validateCreateTodo, todoController.create);
        this.router.put('/update/:id', verifyUserToken, validateUpdateTodo, todoController.update);
        this.router.delete('/delete/:id', verifyUserToken, todoController.delete);
        this.router.get('/getById/:id', verifyUserToken, todoController.getById);
        this.router.get('/getByTodoListId', verifyUserToken, todoController.getByTodoListId);
    }

    getRouter() {
        return this.router
    }
}

export default new TodoRouter();