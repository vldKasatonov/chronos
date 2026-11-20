require("dotenv").config({ quiet: true });
const app = require("./app");
const connectToDB = require("./config/db");
const getISODate = require("./utils/date");

const PORT = process.env.PORT || 3000;

const run = async () => {
    try {
        await connectToDB();
        console.log(`API [${getISODate()}]: server connected to MongoDB.`)
        const api = app.listen(PORT, "0.0.0.0", () =>
            console.log(`API [${getISODate()}]: server is running on http://localhost:${PORT}`)
        );
        api.on("error", err => {
            console.error(`API [${getISODate()}]: server error occurred, shutting down...`);
            console.error(err);
            process.exit(1);
        });
    } catch (err) {
        console.error(`API [${getISODate()}]: failed to start server.`);
        console.error(err);
        process.exit(1);
    }
};

void run();