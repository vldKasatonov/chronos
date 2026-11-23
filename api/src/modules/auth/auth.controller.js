const service = require("./auth.service");

class AuthController {
    async signUp(req, res, next) {
        try {
            const { first_name, last_name, username, email, password } = req.body;
            const user = await service.signUp(first_name, last_name, username, email, password);
            return res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();