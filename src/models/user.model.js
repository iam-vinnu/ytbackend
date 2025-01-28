import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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


userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash( this.password , 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password);
};

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
    {
        _id : this._id,
        email : this.email,
        userName : this.userName ,
        fullName : this.fullName
    } , process.env.ACCESS_TOKEN_SECRETE ,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
};

userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
    {
        _id : this._id,
    },
     process.env.REFRESH_TOKEN_SECRET ,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
    }
)
};
export const User = mongoose.model("User", userSchema);