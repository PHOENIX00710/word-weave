import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
)

export const userModel = mongoose.model("User", userSchema);