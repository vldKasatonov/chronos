const {Router} = require("express");

const validate = require("../../middlewares/validate");
const schemas = require("./auth.schemas");
const controller = require("./auth.controller");

const router = Router();

router.post(
    "/sign-up",
    validate(schemas.signUp),
    controller.signUp
);

module.exports = router;