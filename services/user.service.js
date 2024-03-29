const { User } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const TokenService = require("./token.service");
const ApiError = require("../exeptions/apiError");
const MailerService = require("./mailer.service");

class UserService {
    async register(email, username, password) {
        const candidate = await User.findOne({ $or: [{ email }, { username }] }).lean();

        if (candidate) {
            if (candidate.email === email) {
                throw ApiError.badRequest("Аккаунт с такой почтой уже существует");
            }

            if (candidate.username === username) {
                throw ApiError.badRequest("Такое имя пользователя занято");
            }
        }
        const hashPassword = await bcrypt.hash(password, 7);
        const mailActivationToken = uuid.v4();

        await User.create({
            email,
            username,
            password: hashPassword,
            mailActivationToken,
        });

        MailerService.verify(email, username, mailActivationToken);
    }

    async login(username, password) {
        const user = await User.findOne({ $or: [{ email: username }, { username }] });

        if (!user) {
            throw ApiError.badRequest("Неверный логин или пароль");
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordsEqual) {
            throw ApiError.badRequest("Неверный логин или пароль");
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
            if (!refreshToken) {
                throw ApiError.unauthorizedError();
            }

            const tokenPayload = TokenService.validateRefreshToken(refreshToken);
            const tokenFromDB = await TokenService.findToken(refreshToken);
            if (!tokenPayload || !tokenFromDB) {
                throw ApiError.unauthorizedError();
            }

            const user = await User.findById(tokenPayload.user._id);
            const tokens = TokenService.generateTokens({ user });
            await TokenService.saveToken(user._id, tokens.refreshToken);

            return {
                ...tokens,
                user,
            };
        } finally {
            TokenService.remove(refreshToken);
        }
    }

    async verifyMail(token) {
        const user = await User.findOne({ mailActivationToken: token });

        if (!user) {
            throw ApiError.badRequest("Пользователь с таким токеном подтверждения не найден");
        }

        user.mailActivationToken = null;
        user.isVerified = true;
        await user.save();

        const tokens = TokenService.generateTokens({ user });

        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async sendVerifyMail(username) {
        const user = await User.findOne({ username });

        if (!user) {
            throw ApiError.notFound("Пользователь не найден");
        }

        if (user.isVerified) {
            throw ApiError.badRequest("Почта уже подтверждена");
        }

        const mailActivationToken = uuid.v4();

        user.mailActivationToken = mailActivationToken;

        await user.save();

        return MailerService.verify(user.email, user.username, mailActivationToken);
    }

    async getAll() {
        const users = await User.find().lean();
        return users;
    }
}

module.exports = new UserService();
