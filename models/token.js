const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        expireAt: {
            type: Date,
            default: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        },
    },
    { versionKey: false },
);

tokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 5 });

module.exports = model('Token', tokenSchema);
