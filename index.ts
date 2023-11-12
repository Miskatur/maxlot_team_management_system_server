import mongoose from "mongoose";
import dotenv from "dotenv";
import app from './app';
dotenv.config();
const port: number = Number(process.env.PORT) || 8080;



// Databse connection
async function main(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connection successful");

        app.listen(port, () => {
            console.log(`Express server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect with database", error);
    }
}

main();

