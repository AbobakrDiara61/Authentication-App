import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: String,
    lastLoginAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date
}, { timestamps: true });

/** @type {import('mongoose').Model} */
const User = mongoose.model('User', userSchema);

export default User