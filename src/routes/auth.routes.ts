import {Router} from "express";
import authController from "../controllers/auth.controller";

export class AuthRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }
    #initializeRoutes() {
        this.router.post('/register', authController.register);
        this.router.post('/login', authController.login);
        this.router.post('/refresh', authController.refresh);

    }
    public getRouter():Router {
        return this.router
    }
}

export default new AuthRouter();