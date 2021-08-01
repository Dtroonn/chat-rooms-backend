const { Router } = require('express');
const { AuthController } = require('../controllers');
const { registerValidators } = require('../validators/auth.validators');

const router = Router();

router.post('/register', registerValidators, AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

module.exports = router;
