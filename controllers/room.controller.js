const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");

class RoomController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()));
            }

            res.status(200).json({
                message: "hello from room controller",
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new RoomController();
