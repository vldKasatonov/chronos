const createHttpError = require("http-errors");
const { ZodError } = require("zod");

module.exports = (err, req, res, _next) => {
    if (createHttpError.isHttpError(err)) {
        return res.status(err.status).json({error: err.message});
    }
    if (err instanceof ZodError) {
        return res.status(400).json({errors: err.issues});
    }
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
};