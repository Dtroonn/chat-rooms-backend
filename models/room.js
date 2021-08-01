const { Schema, model } = require('mongoose');

const roomSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        versionKey: false,
    },
);

roomSchema.methods.addUser = function (user) {
    this.users.push(user);
    return this.save();
};

module.exports = model('Room', roomSchema);
