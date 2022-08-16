const { Router } = require("express");

const { FileController } = require("../controllers");
const upload = require("../core/multer");

const router = Router();

router.post("/", upload.single("file"), FileController.upload);

module.exports = router;
