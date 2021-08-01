module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedError() {
        return new this(401, 'Пользователь не авторизован');
    }

    static badRequest(message, errors) {
        return new this(400, message, errors);
    }
};
