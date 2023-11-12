const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app')
const server = require('./app')
dotenv.config();
const port = process.env.PORT || 8080;



// Databse connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection successful");

        server.listen(port, () => {
            console.log(`Mongoose listening on port ${port}`);
        });
    } catch {
        console.log("Failed to connect with database");
    }
}

main();

