const { startSession } = require("mongoose");
const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");
const { RoomSerivce, RoomAndUserService, SocketIoService } = require("../services");

class RoomController {
    async create(req, res, next) {
        const session = await startSession();
        session.startTransaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()));
            }

            const room = await RoomSerivce.create(req.body, req.user, session);
            await RoomAndUserService.create(req.user._id, room._id);
            await session.commitTransaction();

            res.status(201).json(room);
        } catch (e) {
            await session.abortTransaction();
            next(e);
        } finally {
            session.endSession();
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

    async joinToRoom(req, res, next) {
        try {
            const { id } = req.params;
            const { user } = req;
            await RoomAndUserService.create(user._id, id);
            // SocketIoService.emitMessageToRoom(id, { id: 'JOIN_TO_ROOM', fullname: "", text: `${user.username} присоединился к комнате`, avatar: "" })
            res.end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RoomController();
