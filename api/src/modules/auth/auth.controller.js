const createHttpError = require("http-errors");

class AuthController {
    async signUp(req, res, next) {
        try {
            return next(createHttpError.NotImplemented());
        } catch (err) {
            console.error(err);
            next(createHttpError.InternalServerError());
        }
    }
}

module.exports = new AuthController();