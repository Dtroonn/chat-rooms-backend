const { Room } = require('../models');

class RoomService {
    async create() {
        const room = await Room.create({});
        return room;
    }
}

module.exports = new RoomService();
