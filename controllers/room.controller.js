const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");
const { RoomSerivce } = require("../services");

class RoomController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()));
            }

            const room = await RoomSerivce.create(req.body, req.user, req.file);

            res.status(201).json(room);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const rooms = await RoomSerivce.get();

            res.json({
                items: rooms,
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RoomController();
