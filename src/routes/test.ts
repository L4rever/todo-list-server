import {Router} from "express";
import verifyUserToken from "../middlewares/verifyUserToken";

export default class TestRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.#initializeRoutes();
    }
    #initializeRoutes() {
        this.router.get('/test', verifyUserToken, (req: any, res, next) => {
            res.status(200).json({message: req.user.id});
        })
    }
    public getRouter():Router {
        return this.router
    }
}