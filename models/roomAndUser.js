const { Schema, model } = require("mongoose");

const roomAndUserSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

module.exports = model("RoomAndUser", roomAndUserSchema);
