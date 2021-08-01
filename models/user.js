const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    { versionKey: false },
);

userSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret.password;
        return ret;
    },
});

module.exports = model('User', userSchema);
