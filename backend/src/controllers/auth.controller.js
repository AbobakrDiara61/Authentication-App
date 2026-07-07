import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import User from "../models/user.model.js";
import tokenUtils from "../utils/tokens.js";
import validate from "../utils/validate.js";
import { 
    sendVerificationEmail, 
    sendWelcomeEmail, 
    sendResetPasswordEmail, 
    sendPasswordResetSuccessEmail 
} from "../utils/email.js";

const { createToken, setCookie, createRefreshToken } = tokenUtils;
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        validate({ name, email, password });

        const exits = await User.findOne({ email });
        if(exits) 
            return res.status(400).json({ message: "User already exists"});
        
        const hasedPassword = await bcryptjs.hash(password, 10);
        const verficationCode = Math.floor(100000 + 900000 * Math.random());
        const verificationCodeExpiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes
        const user = new User({ 
            name, 
            email, 
            password: hasedPassword, 
            verificationCode: verficationCode,
            verificationCodeExpiresAt: verificationCodeExpiresAt
        });

        await user.save();
        const token = createToken({ name, email, _id: user._id });
        setCookie(res, token, 'token');
        const refreshToken = createRefreshToken({ _id: user._id });
        setCookie(res, refreshToken, 'refreshToken');
        user.refreshToken = await bcryptjs.hash(refreshToken, 10);
        await user.save();
        await sendVerificationEmail(email, verficationCode, 3);
        return res.status(201).json({
            message: "User created successfully", 
            user: {
                ...user._doc, 
                password: undefined, 
                verificationCode: undefined, 
                verificationCodeExpiresAt: undefined,
                refreshToken: undefined,
            }
        });
        
    } catch (error) {
        const { email } = req.body; 
        await User.findOneAndDelete({ email });
        console.error("Error in Sign up controller", error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        try {
            if(!email) 
                return res.status(400).json({ message: "Email is required" });
            if(!password) 
                return res.status(400).json({ message: "Password is required" });
            
            const user= await User.findOne({ email });
            if(!user)
                return res.status(404).json({ message: "User not found" });
            
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if(!isPasswordValid)
                return res.status(401).json({ message: "Invalid Password" });

            const verficationCode = Math.floor(100000 + 900000 * Math.random());
            const verificationCodeExpiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes
            user.verificationCode = verficationCode;
            user.verificationCodeExpiresAt = verificationCodeExpiresAt;
            await sendVerificationEmail(user.email, verficationCode, 3);

            user.lastLoginAt = Date.now();
            await user.save();

            const token = createToken({ name: user.name, email, _id: user._id });
            setCookie(res, token, 'token');
            const refreshToken = createRefreshToken({ _id: user._id });
            setCookie(res, refreshToken, 'refreshToken');

            user.refreshToken = await bcryptjs.hash(refreshToken, 10);
            await user.save();
            return res.status(200).json({
                message: "Login successful", 
                user: {
                    ...user._doc,
                    password: undefined,
                    verificationCode: undefined,
                    verificationCodeExpiresAt: undefined,
                    refreshToken: undefined,
                }
            });
        } catch (error) {
            console.error("Error In login controller", error);
            return res.status(500).json({ message: error.message });
        }
    } catch (error) {
        console.error("Error In login controller", error);
        return res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById({ _id });
        if(!user)
            return res.status(404).json({ message: "User not found" });
        user.isVerified = false;
        user.refreshToken = undefined;
        await user.save();
        
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: "Logged out successfully"});
    } catch (error) {
        console.error("Error in Logout controller", error);
        return res.status(500).json({ message: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { code } = req.body;
        const { _id } = req.user;
        const user = await User.findById(_id);
        if(!user)
            return res.status(404).json({ message: "User not found" });
        
        if(code !== user.verificationCode)
            return res.status(400).json({ message: "Incorrect OTP Code"});

        if(user.verificationCodeExpiresAt < Date.now()) 
            return res.status(400).json({ message: "OTP Code has expired"});
        
        await sendWelcomeEmail(user.email, user.name);
        
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;
        user.lastLoginAt = Date.now();
        await user.save();
        return res.status(200).json({ message: "Account Verified successfully" });
    } catch (error) {
        console.error("Error in Verify controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if(!user)
            return res.status(404).json({ message: "User not found" });
        
        await User.findByIdAndDelete(_id);
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: "Account deleted successfully"});
    } catch (error) {
        console.error("Error in Delete Account controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user) 
            return res.status(404).json({ message: "User not Found Invalid Email Credential" });

        const resetPasswordToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordTokenExpiresAt = Date.now() + 60 * 1000;
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
        await user.save();
        
        await sendResetPasswordEmail(email, resetPasswordToken);
        return res.status(200).json({ message: "Reset Password Request Sent Successfully" });
    } catch (error) {
        console.error("Error In forgotPassword Controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })
        console.log({token, password})
        if(!user)
            return res.status(404).json({ message: "Invalid Token" });
        /* 
            1. hash the new password
            2. update the database
                1. new password
                2. reset password token
                3. reset password token expires at
            3. send email to user
            4. send success response
        */
        if(!password) 
            return res.status(400).json({ message: "Password is required" });
        if(!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }))
            return res.status(400).json({ message: "Password is not strong" });
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        await sendPasswordResetSuccessEmail(user.email);
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error In resetPassword Controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const checkAuthentication = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id).select('-password -refreshToken -verificationCode -verificationCodeExpiresAt');
        if(!user) 
            return res.status(404).json({ message: "User Not Found "});
        return res.status(200).json({ message: "User is Authenticated", user });

    } catch (error) {
        console.error("Error in checkAuthentication controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            return res.status(401).json({ message: "Token is not provided Login again" });
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); //, { ignoreExpiration: true }
        const user = await User.findById(payload._id);
        if(!user)
            return res.status(403).json({ message: "Unauthorized" });

        // React strict mode causes this error (in dev mode)
        const isTokenMatched = await bcryptjs.compare(refreshToken, user.refreshToken);
        if(!user.refreshToken || isTokenMatched) 
            return res.status(403).json({ message: "Problem with refreshToken" });            
        
        const newRefreshToken = createRefreshToken({ _id: user._id });
        const token = createToken({ name: user.name, email: user.email, _id: user._id });
        setCookie(res, token, 'token');
        setCookie(res, newRefreshToken, 'refreshToken');
        user.refreshToken = await bcryptjs.hash(newRefreshToken, 10);
        await user.save();

        return res.status(200).json({ message: "Token refreshed successfuly" });
    } catch (error) {
        console.error("Error in refresh controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const resendOTP = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if(!user) 
            return res.status(404).json({ message: "User Not Found "});
        if(user.isVerified)
            return res.status(400).json({ message: "User is already verified" });
        
        const OTP = Math.floor(100000 + Math.random() * 900000);
        user.verificationCode = OTP;
        user.verificationCodeExpiresAt = Date.now() + 60 * 1000;
        await user.save();
        await sendVerificationEmail(user.email, OTP, 3);
        
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error in resendOTP controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const authControllers = {
    signup,
    login,
    logout,
    deleteAccount,
    verifyOTP,
    forgotPassword,
    resetPassword,
    checkAuthentication,
    refresh,
    resendOTP,
};

export default authControllers;
