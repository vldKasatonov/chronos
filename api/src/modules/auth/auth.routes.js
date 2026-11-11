const {Router} = require("express");

const controller = require("./auth.controller");

const router = Router();

router.post(
    "/sign-up",
    controller.signUp
);

module.exports = router;