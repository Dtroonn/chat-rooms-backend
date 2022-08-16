const { startSession } = require("mongoose");
const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");
const { MessageService } = require("../services");

class MessageController {
    async create(req, res, next) {
        try {
            const { user } = req;
            const { roomId } = req.params;
            const { text } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()));
            }

            const message = await MessageService.create(user, roomId, text);

            if (!message) {
                return next(ApiError.forbidden());
            }

            res.status(201).json(message);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const { roomId } = req.params;
            const { user } = req;
            const messages = await MessageService.getManyByUserAndRoomId(user, roomId);

            if (!messages) {
                return next(ApiError.forbidden());
            }

            res.json({
                items: messages,
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MessageController();
