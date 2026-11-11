const createHttpError = require("http-errors");

module.exports = (err, req, res, _next) => {
    if (createHttpError.isHttpError(err)) {
        return res.status(err.status).json({error: err.message});
    }
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
};