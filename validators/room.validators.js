const { body } = require("express-validator");

exports.createRoomValidators = [
    body("title")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Название комнаты должно содержать от 4 до 20 символов"),

    body("description")
        .optional()
        .trim()
        .isLength({ min: 4, max: 150 })
        .withMessage("Описание комнаты должно содержать от 4 до 20 символов"),
];
