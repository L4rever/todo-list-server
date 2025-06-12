import {Router} from "express";
import authController from "../controllers/auth.controller";
import {validateLogin, validateRegister} from "../middlewares/validators/auth.validators";

export class AuthRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }
    #initializeRoutes() {
        this.router.post('/register', validateRegister, authController.register);
        this.router.post('/login', validateLogin, authController.login);
        this.router.post('/refresh', authController.refresh);

    }
    public getRouter():Router {
        return this.router
    }
}

export default new AuthRouter();