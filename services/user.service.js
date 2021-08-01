const { User } = require('../models');
const bcrypt = require('bcrypt');
const TokenService = require('./token.service');
const ApiError = require('../exeptions/apiError');

class UserService {
    async register(email, username, password) {
        const candidate = await User.findOne({ $or: [{ email }, { username }] }).lean();

        if (candidate) {
            if (candidate.email === email) {
                throw ApiError.badRequest('Аккаунт с такой почтой уже существует');
            }

            if (candidate.username === username) {
                throw ApiError.badRequest('Такое имя пользователя занято');
            }
        }
        const hashPassword = await bcrypt.hash(password, 7);
        const user = await User.create({ email, username, password: hashPassword });

        const tokens = TokenService.generateTokens({ user });

        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async login(username, password) {
        const user = await User.findOne({ $or: [{ email: username }, { username }] });

        if (!user) {
            throw ApiError.badRequest('Неверный логин или пароль');
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordsEqual) {
            throw ApiError.badRequest('Неверный логин или пароль');
        }

        const tokens = TokenService.generateTokens({ user });

        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async logout(refreshToken) {
        await TokenService.remove(refreshToken);
    }

    async refresh(refreshToken) {
        try {
            throw new Error('HAHAH LALKA');
            if (!refreshToken) {
                throw ApiError.unauthorizedError();
            }

            const tokenPayload = TokenService.validateRefreshToken(refreshToken);
            const tokenFromDB = await TokenService.findToken(refreshToken);
            if (!tokenPayload || !tokenFromDb) {
                throw ApiError.unauthorizedError();
            }
        } finally {
            TokenService.remove(refreshToken);
        }
    }
}

module.exports = new UserService();
