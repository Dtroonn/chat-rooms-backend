const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
        image: {
            type: String,
            default: null,
        },
        usersCount: {
            type: String,
            required: true,
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
