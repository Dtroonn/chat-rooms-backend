const { RoomSerivce, UserService } = require('../services');

class RoomController {
    async create(req, res) {
        try {
            const { userName } = req.body;
            const [Room, User] = await Promise.all([
                RoomSerivce.create(),
                UserService.create(userName),
            ]);
            await Room.addUser(User);
            res.json({
                _id: Room._id,
                users: Room.users,
                messages: [],
                user: User,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new RoomController();
