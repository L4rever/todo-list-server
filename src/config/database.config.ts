import {Sequelize} from "sequelize-typescript";

export default class DatabaseConfig {
    constructor() {
        this.sequelize = new Sequelize(
            {
                database: process.env.DB_NAME,
                dialect: 'postgres',
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                models: ['../models']
            }
        )
    }
    getSequelize():Sequelize {return this.sequelize}
    private readonly sequelize: Sequelize;
}