const { model, Schema } = require("mongoose");

module.exports = model("User", new Schema({
    full_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true, select: false },
    is_verified: { type: Boolean, default: false },
}));