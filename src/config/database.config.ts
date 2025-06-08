import {Sequelize} from "sequelize-typescript";
import path from "path";

export class DatabaseConfig {
    constructor() {
        this.sequelize = new Sequelize(
            {
                database: process.env.DB_NAME,
                dialect: 'postgres',
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                models: [path.resolve(__dirname, '../models')]
            }
        )
    }
    getSequelize():Sequelize {return this.sequelize}
    private readonly sequelize: Sequelize;
}

export default new DatabaseConfig()