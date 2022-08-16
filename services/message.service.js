const { Message } = require("../models");
const RoomAndUserService = require("./RoomAndUser.serivce");
const SocketIoService = require("./socketIo.service");

class MessageService {
    async create(user, roomId, text) {
        const isConsistUserInRoom = await RoomAndUserService.checkConsistUserInRoom(user, roomId);
        if (!isConsistUserInRoom) {
            return null;
        }

        const message = await Message.create({
            user: user._id,
            room: roomId,
            text,
        });

        await message.populate("user").execPopulate();

        SocketIoService.emitMessageToRoom(roomId, message);

        return message;
    }

    async getManyByUserAndRoomId(user, roomId) {
        const isConsistUserInRoom = await RoomAndUserService.checkConsistUserInRoom(user, roomId);
        if (!isConsistUserInRoom) {
            return null;
        }

        return Message.find({ room: roomId }).populate("user");
    }
}

module.exports = new MessageService();
