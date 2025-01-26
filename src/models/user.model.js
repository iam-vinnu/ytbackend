import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        typr: String,   // Cloudinary URL
        required: true
    },
    coverImage: {
        type: String  // Cloudinary also goes here
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: ["true", "Password is Required"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);