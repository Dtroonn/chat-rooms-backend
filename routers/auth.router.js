const { Router } = require("express");
const { AuthController } = require("../controllers");
const {
    registerValidators,
    loginValidators,
    sendVerifyMailValidators,
} = require("../validators/auth.validators");

const router = Router();

router.post("/register", registerValidators, AuthController.register);
router.post("/login", loginValidators, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);
router.get("/verify-mail/:token", AuthController.verifyMail);
router.post("/verify-mail", sendVerifyMailValidators, AuthController.sendVerifyMail);

module.exports = router;
