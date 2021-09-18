const multer = require("multer");
const path = require("path");

const ApiError = require("../exeptions/apiError");

module.exports = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(ApiError.badRequest("Данный тип файла не поддерживается"), false);
            return;
        }
        cb(null, true);
    },
});
