const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
    {
        publicId: {
            type: String,
            required: true,
        },

        width: {
            type: Number,
            default: null,
        },

        height: {
            type: Number,
            default: null,
        },

        bytes: {
            type: Number,
            required: true,
        },

        url: {
            type: String,
            required: true,
        },

        secureUrl: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

module.exports = model("File", fileSchema);
