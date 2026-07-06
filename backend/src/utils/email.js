import dotenv from 'dotenv';
import transporter from '../config/nodemailer.js';
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    EMAIL_VERIFIED_TEMPLATE
} from "./emailTemplates.js";
dotenv.config({ quiet: true });

const sendVerificationEmail = async (email, verificationCode, expiresIn = 1) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verification Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode).replace("{expiresIn}", expiresIn),
            category: "Authentication",
        });
        console.log("Verification Email Sent", info.messageId);
    } catch (error) {
        console.error("Error In Sending Verification Email", error);
        throw new Error("Failed to send verification email");
    }
}

const sendSuccessfullyVerifiedEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verification Email",
            html: EMAIL_VERIFIED_TEMPLATE,
            category: "Authentication"
        });
        console.log("Verified Email Sent successfully", info.messageId);
    } catch (error) {
        console.error("Error In sendSuccessfullyVerifiedEmail", error);
        throw new Error("Failed to send successfully verified email");
    }
}

const sendResetPasswordEmail = async (email, resetPasswordToken) => {
    const baseUrl = `${process.env.CLIENT_URL}/reset-password`
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Reset Password Email",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", `${baseUrl}/${resetPasswordToken}`),
            category: "Password Reset",
        });
        console.log("Reset Password Email Sent", info.messageId);
    } catch (error) {
        console.error("Error In Sending Reset Password Email", error);
    }
}

const sendPasswordResetSuccessEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success"
        })
        console.log("Password Reset Success Email Sent", info.messageId);
    } catch (error) {
        console.error("Error In Sending Password Reset Success Email", error);
        throw new Error("Failed to send password reset success email");
    }
}

const sendWelcomeEmail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our website",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "welcome"
        });
        console.log("Welcome Email Sent successfully", info.messageId);
    } catch (error) {
        console.error("Error In Sending Welcome Email", error);
        throw new Error("Failed to send welcome email");
    }
}

export {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendResetPasswordEmail,
    sendPasswordResetSuccessEmail,
    sendSuccessfullyVerifiedEmail,
}

