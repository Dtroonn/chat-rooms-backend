const { Router } = require("express");

const { RoomController } = require("../controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createRoomValidators } = require("../validators/room.validators");

const router = Router();

router.post("/", createRoomValidators, authMiddleware, RoomController.create);

router.get("/", RoomController.get);

router.post('/join/:id', authMiddleware, RoomController.joinToRoom);

module.exports = router;
