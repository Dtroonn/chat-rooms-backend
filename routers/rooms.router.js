const { Router } = require("express");

const { RoomController } = require("../controllers");
const upload = require("../core/multer");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createRoomValidators } = require("../validators/room.validators");

const router = Router();

router.post(
    "/",
    upload.single("image"),
    createRoomValidators,
    authMiddleware,
    RoomController.create,
);

router.get("/", RoomController.get);

module.exports = router;
