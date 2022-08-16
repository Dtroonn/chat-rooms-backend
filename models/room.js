const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        admins: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
        image: {
            type: Schema.Types.ObjectId,
            ref: "File",
            default: null,
        },
        usersCount: {
            type: Number,
            default: 1,
        },
    },
    {
        versionKey: false,
    },
);

roomSchema.methods.addUser = function (user) {
    this.users.push(user);
    return this.save();
};

module.exports = model("Room", roomSchema);
