import {Router} from "express";

export default class TestRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }
    #initializeRoutes() {
        this.router.get('/test', (req, res, next) => {
            res.status(200).json({message: "aboba"});
        })
    }
    public getRouter():Router {
        return this.router
    }
}