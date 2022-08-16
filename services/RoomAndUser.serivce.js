const { RoomAndUserModel } = require("../models");
const ApiError = require("../exeptions/apiError");

class RoomAndUserService {
    async create(userId, roomId) {
        const isConsistUserInRoom = await this.checkConsistUserInRoom(userId, roomId);
        if (isConsistUserInRoom) {
            throw ApiError.badRequest("Такой пользователь уже есть в комнате");
        }

        return RoomAndUserModel.create({
            user: userId,
            roomId,
        });
    }

    async checkConsistUserInRoom(user, roomId) {
        const candidate = await RoomAndUserModel.findOne({ user: user._id, roomId });
        return !!candidate;
    }
}

module.exports = new RoomAndUserService();
