// settings of server
import express, {Application} from "express"
import cors from "cors"
import TestRouter from "./routes/test";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";

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
        this.app.use('/', this.testRouter.getRouter());
        this.app.use('/auth', authRoutes.getRouter());
        this.app.use('/todo', todoRoutes.getRouter())
    };
    getApp(): Application{
        return this.app;
    };
    private readonly app: Application;
    private testRouter: TestRouter;
}