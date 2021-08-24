const { Router } = require('express');
const { UserController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', authMiddleware, UserController.getAll);

module.exports = router;
