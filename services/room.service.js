const { Room } = require("../models");
const FileService = require("./file.service");

class RoomService {
    async create(data, user, image) {
        const file = await FileService.uploadOne(image);

        const room = await Room.create({
            ...data,
            admins: user._id,
            image: file._id,
        });

        await room.populate("image admins").execPopulate();

        return room;
    }

    async get() {
        return Room.find().populate("image admins");
    }
}

module.exports = new RoomService();
