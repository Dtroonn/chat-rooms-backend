const { Room } = require("../models");

class RoomService {
    async create(data, user, session) {
        const result = await Room.create(
            [
                {
                    ...data,
                    admins: user._id,
                },
            ],
            { session },
        );

        const room = result[0];

        await room.populate("image admins").execPopulate();

        return room;
    }

    async get() {
        return Room.find().populate("image admins");
    }
}

module.exports = new RoomService();
