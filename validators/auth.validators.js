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
        console.log(value);
        if (value !== req.body.password) {
            throw new Error("Пароли не совпадают");
        }

        return true;
    }),
];

exports.loginValidators = [
    body("email").isEmail().withMessage("Некорректная почта").normalizeEmail(),
];
