require("dotenv").config({ quiet: true });
const app = require("./app");
const getISODate = require("./utils/date");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const run = async () => {
    try {
        const api = app.listen(PORT, HOST, () =>
            console.log(`API [${getISODate()}]: server is running on http://${HOST}:${PORT}`)
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