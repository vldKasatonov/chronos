const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5000",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);
app.use((req, res) =>
    res.status(404).json({error: "Not Found"})
);
app.use(errorHandler);

module.exports = app;