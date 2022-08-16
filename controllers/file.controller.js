const { FileService } = require("../services");

class FileController {
    async upload(req, res, next) {
        try {
            const file = await FileService.uploadOne(req.file);

            res.status(200).json(file);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new FileController();
