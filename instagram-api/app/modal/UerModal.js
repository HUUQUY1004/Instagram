const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            maxLength: 150,
        },
        password: {
            type: String,
            require: true,
        },
        isAvatarImage: {
            type: Boolean,
        },
        avatarImage: {
            type: String,
        },
        followers: {
            type: Array,
            require: true,
        },
        following: {
            type: Array,
            require: true,
        },
        ticked: {
            type: Boolean,
        },
        saving: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', UserSchema);
