const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const User = require("./user.model");

class AuthService {
    async signUp(first_name, last_name, username, email, password) {
        const existing = await User.findOne({$or: [{username}, {email}]}).lean();
        if (existing) {
            const field = existing.username === username ? "Username" : "Email";
            throw createHttpError.Conflict(`${field} is already taken`);
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            full_name: `${first_name} ${last_name}`,
            username,
            email,
            password_hash,
        });

        return {
            id: user._id,
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            is_verified: user.is_verified,
        };
    }
}

module.exports = new AuthService();