const { body } = require("express-validator");

exports.createMessageValidators = [
    body("text").trim().not().isEmpty().withMessage("Сообщение не может быть пустым"),
];
