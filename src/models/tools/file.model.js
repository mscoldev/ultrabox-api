const { Schema, model } = require("mongoose")

const fileSchema = Schema({
    fieldname: {
        type: String,
    },
    originalname: {
        type: String,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    filename: {
        type: String
    },
    path: {
        type: String
    },
    size: {
        type: Number
    },
}, {
    timestamps: false,
    versionKey: false
})

module.exports = model('File', fileSchema);
