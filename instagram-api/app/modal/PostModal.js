const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;
const PostSchema = new Schema(
    {
        idUser: {
            type: String,
            default: undefined,
        },
        title: {
            type: String,
            default: '',
        },
        file: {
            type: String,
            default: '',
        },
        isComment: {
            type: Boolean,
            default: true,
        },
        isShowLike: {
            type: Boolean,
            default: true,
        },
        scaleImage: {
            type: Number,
            default: 1,
        },
        like: {
            type: Array,
            default: [],
        },
        comment: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Post', PostSchema);
