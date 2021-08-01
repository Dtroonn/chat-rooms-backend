const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/apiError');
const { UserService } = require('../services');

class AuthController {
    async register(req, res, next) {
        const { username, email, password } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()));
            }

            const userData = await UserService.register(email, username, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const userData = await UserService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json();
        } catch (e) {}
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
