const cloudinary = require("../core/cloudinary");
const ApiError = require("../exeptions/apiError");
const { File } = require("../models");

class FileService {
    async uploadOne(file) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "chat-rooms", format: "webp" }, async (error, result) => {
                    if (error || !result) {
                        reject(ApiError.badRequest("Не удалось загрузить файл"));
                        return;
                    }

                    const file = await File.create({
                        publicId: result.public_id,
                        width: result.width,
                        height: result.height,
                        bytes: result.bytes,
                        url: result.url,
                        secureUrl: result.secure_url,
                    });

                    resolve(file);
                })
                .end(file.buffer);
        });
    }

    async delete(publicId) {
        return cloudinary.uploader.destroy(publicId);
    }
}

module.exports = new FileService();
