const { body } = require('express-validator');

exports.registerValidators = [
    body('email').isEmail().withMessage('Некорректная почта').normalizeEmail(),
    body('password')
        .isString()
        .withMessage('Пароль должен быть строкой')
        .isLength({ min: 6 })
        .withMessage('Пароль должен содержать не менее 6 символов'),
    body('passwordConfirm').custom((value, { req }) => {
        console.log(value);
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }

        return true;
    }),
];

exports.loginValidators = [
    body('email').isEmail().withMessage('Некорректная почта').normalizeEmail(),
];
