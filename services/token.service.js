const jwt = require("jsonwebtoken");
const { Token } = require("../models");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES,
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES,
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return payload;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return payload;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await Token.create({ user: userId, refreshToken });
        return token;
    }

    async remove(refreshToken) {
        await Token.deleteOne({ refreshToken });
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({ refreshToken });
        return token;
    }
}

module.exports = new TokenService();
