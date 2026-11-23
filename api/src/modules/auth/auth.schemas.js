const { z } = require("zod");

const signUp = z.object({
    first_name: z
        .string("First name is required")
        .trim()
        .nonempty("First name is required")
        .max(32, "First name must be at most 32 characters")
        .regex(/^[A-Za-z]+$/, "First name may contain only Latin letters"),
    last_name: z
        .string("Last name is required")
        .trim()
        .nonempty("Last name is required")
        .max(32, "Last name must be at most 32 characters")
        .regex(/^[A-Za-z]+$/, "Last name may contain only Latin letters"),
    username: z
        .string("Username is required")
        .trim()
        .min(5, "Username must be at least 5 characters")
        .max(32, "Username must be at most 32 characters")
        .regex(/^[a-z0-9_]+$/, "Username may contain only lowercase letters, digits and underscores"),
    email: z
        .email("Invalid email address")
        .toLowerCase(),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must be at most 64 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit"),
});

module.exports = {
    signUp,
};