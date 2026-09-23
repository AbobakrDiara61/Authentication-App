import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/user.model.js";
import * as authServices from '../services/auth.service.js'
import tokenUtils from "../utils/tokens.js";
import { 
    sendWelcomeEmail, 
} from "../utils/email.js";
import { ensureStrings, pick } from '../utils/validate.js';

const { createToken, setCookie, createRefreshToken } = tokenUtils;
const signup = async (req, res) => {
    try {
        const fields = ["name", "email", "password"];
        const body = pick(req.body, fields);
        ensureStrings(body, fields);

        const { user, token, refreshToken } = await authServices.signup(body);

        setCookie(res, token, 'token');
        setCookie(res, refreshToken, 'refreshToken');

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
        console.error("Error in Sign up controller", error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const fields = ["email", "password"];
        const body = pick(req.body, fields);
        ensureStrings(body, fields);
        const { user, token, refreshToken } = await authServices.login(body);

        setCookie(res, token, 'token');
        setCookie(res, refreshToken, 'refreshToken');

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
        console.error("Error in login controller", error);
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
        const fields = ["code"];
        const { code } = pick(req.body, fields);
        ensureStrings({ code }, fields);

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
        const fields = ["email"];
        const { email } = pick(req.body, fields);

        ensureStrings({ email }, fields);

        await authServices.forgotPassword(email);

        return res.status(200).json({ message: "Reset Password Request Sent Successfully" });
    } catch (error) {
        console.error("Error In forgotPassword Controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const fields = ["token", "password"];
        const body = pick(req.body, fields);
        ensureStrings(body, fields);

        await authServices.resetPassword(body);

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
        if(!user.refreshToken || !isTokenMatched) 
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
        await authServices.resendOTP(_id);
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error in resendOTP controller", error);
        return res.status(500).json({ message: error.message });
    }
}

const changeEmail = async (req, res) => {
    try {
        const { _id } = req.user;

        const fields = ["email"];
        const { email } = pick(req.body, fields);
        ensureStrings({ email }, fields);

        const isEmailExists = await User.findOne({ email });
        if(isEmailExists)
            return res.status(400).json({ message: "This email currently in use" });

        await User.findByIdAndUpdate(_id, { email });

        return res.status(200).json({ message: "Email updated successfuly" }); 
    } catch (error) {
        console.error("Error in changeEmail controller", error);
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
    changeEmail
};

export default authControllers;
