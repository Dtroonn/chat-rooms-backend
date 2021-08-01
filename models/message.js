const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        roomId: Number,
    },
    { versionKey: false },
);

module.exports = model('Message', messageSchema);
