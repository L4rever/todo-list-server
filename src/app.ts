// settings of server
import express, {Application} from "express"
import cors from "cors"
import TestRouter from "./routes/test";

export default class App{

    constructor() {
        this.app = express();
        this.testRouter = new TestRouter();
        this.#initializeMiddlewares();
        this.#initializeRoutes();
    };
    #initializeMiddlewares() : void{
        this.app.use(cors());
        this.app.use(express.json());
    };
    #initializeRoutes() : void{
        this.app.use('/', this.testRouter.getRouter())
    };
    getApp(): Application{
        return this.app;
    };
    private readonly app: Application;
    private testRouter: TestRouter;
}