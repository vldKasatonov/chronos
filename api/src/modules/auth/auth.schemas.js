const { z } = require("zod");

const signUp = z.object({
    first_name: z.string().trim().nonempty().max(32).regex(/^[A-Za-z]+$/),
    last_name: z.string().trim().nonempty().max(32).regex(/^[A-Za-z]+$/),
    username: z.string().trim().min(5).max(32).regex(/^[a-z0-9_]+$/),
    email: z.email().toLowerCase(),
    password: z.string().min(8).max(64).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
});

module.exports = {
    signUp,
};