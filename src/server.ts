import App from "./app";
import dotenv from "dotenv";
import DatabaseConfig from "./config/database.config";

async function main() {
    dotenv.config();

    const app = new App().getApp();
    const sequelize = new DatabaseConfig().getSequelize();

    await sequelize.sync();

    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}

main().catch(console.error);