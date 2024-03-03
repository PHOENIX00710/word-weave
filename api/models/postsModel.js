import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://qph.cf2.quoracdn.net/main-qimg-0481a6f0eba74b85625d2e116c9f6596-lq',
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

const postModel = model("Post", postSchema);
export default postModel; 