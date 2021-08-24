const ApiError = require('../exeptions/apiError');
const { TokenService } = require('../services');

exports.authMiddleware = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorizedError());
        }

        const tokenPayload = TokenService.validateAccessToken(accessToken);
        if (!tokenPayload) {
            return next(ApiError.unauthorizedError());
        }

        req.user = tokenPayload.user;
        next();
    } catch (e) {
        next(ApiError.unauthorizedError());
    }
};
