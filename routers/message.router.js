const { Router } = require("express");

const { MessageController } = require("../controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createMessageValidators } = require("../validators/message.validators");

const router = Router();

router.post("/:roomId", authMiddleware, createMessageValidators, MessageController.create);

router.get("/:roomId", authMiddleware, MessageController.get);

module.exports = router;
