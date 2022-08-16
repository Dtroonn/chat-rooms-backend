const { body } = require("express-validator");

exports.registerValidators = [
    body("email").isEmail().withMessage("Некорректная почта").normalizeEmail(),
    body("username")
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage("Имя пользователя должно содержать от 2 до 20 символов"),
    body("password")
        .isString()
        .withMessage("Пароль должен быть строкой")
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать не менее 6 символов"),
    body("passwordConfirm").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Пароли не совпадают");
        }

        return true;
    }),
];

exports.loginValidators = [
    body("username").trim().notEmpty().withMessage("Поле обязательно к заполнению"),
    body("password").notEmpty().withMessage("Поле обязательно к заполнению"),
];

exports.sendVerifyMailValidators = [
    body("username").trim().notEmpty().withMessage("Поле обязательно к заполнению"),
];
