const { UserService } = require('../services');

class UserController {
    async getAll(req, res) {
        console.log(req.user);
        const users = await UserService.getAll();
        res.json({
            users,
        });
    }
}

module.exports = new UserController();
