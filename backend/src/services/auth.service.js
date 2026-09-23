import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";
import { validate } from "../utils/validate.js";
import tokenUtils from "../utils/tokens.js";
import { 
    sendVerificationEmail, 
} from "../utils/email.js";

const { createToken, createRefreshToken } = tokenUtils;


const signup = async (data) => {
    const { name, email, password } = data;
    validate(data);
    const exits = await User.findOne({ email });
    if(exits) 
        throw new Error("User already exists");
    
    const hasedPassword = await bcryptjs.hash(password, 10);
    const verficationCode = Math.floor(100000 + 900000 * Math.random());
    const verificationCodeExpiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes
    const user = await User.create({ 
        name, 
        email, 
        password: hasedPassword, 
        verificationCode: verficationCode,
        verificationCodeExpiresAt: verificationCodeExpiresAt
    });

    const token = createToken({ name, email, _id: user._id });
    const refreshToken = createRefreshToken({ _id: user._id });
    user.refreshToken = await bcryptjs.hash(refreshToken, 6);
    await user.save();

    await sendVerificationEmail(email, verficationCode, 3);

    return {
        user,
        token,
        refreshToken,
    }
};

const login = async (data) => {
    const { email, password } = data;

    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid Email or Password.");

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Email or Password.");

    const verficationCode = Math.floor(100000 + 900000 * Math.random());
    const verificationCodeExpiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes

    user.verificationCode = verficationCode;
    user.verificationCodeExpiresAt = verificationCodeExpiresAt;
    user.lastLoginAt = Date.now();

    await sendVerificationEmail(user.email, verficationCode, 3);

    const token = createToken({ name: user.name, email, _id: user._id });
    const refreshToken = createRefreshToken({ _id: user._id });

    user.refreshToken = await bcryptjs.hash(refreshToken, 6);
    await user.save();

    return { user, token, refreshToken };
};

export {
    signup,
    login,
}