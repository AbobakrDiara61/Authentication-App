import dotenv from 'dotenv';
import { client, sender } from "../config/mailtrap.js";
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE
} from "./emailTemplates.js";
dotenv.config({ quiet: true });

const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await client.send({
            from: sender,
            to: [{ email }],
            subject: "Verification Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            category: "Authentication",
        });
        console.log("Verification Email Sent", response);
    } catch (error) {
        console.error("Error In Sending Verification Email", error);
        throw new Error("Failed to send verification email");
    }
}

const sendResetPasswordEmail = async (email, resetPasswordToken) => {
    const baseUrl = `${process.env.CLIENT_URL}/reset-password`
    try {
        client.send({
            from: sender,
            to: [{ email }],
            subject: "Reset Password Email",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", `${baseUrl}/${resetPasswordToken}`),
            category: "Password Reset",
        }).then(console.log);
    } catch (error) {
        console.error("Error In Sending Reset Password Email", error);
    }
}

const sendPasswordResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success"
        })
    } catch (error) {
        console.error("Error In Sending Password Reset Success Email", error);
        throw new Error("Failed to send password reset success email");
    }
}
const sendWelcomeEmail = async (email, name) => {
    try {
        await client.send({
            from: sender,
            to: [{ email }],
            subject: "Welcome to our website",
            text: `Welcome to our website, ${name}`,
            category: "welcome"
        });
        console.log("Welcome Email Sent successfully");
    } catch (error) {
        console.error("Error In Sending Welcome Email", error);
        throw new Error("Failed to send welcome email");
    }
}
// console.log(process.env.MAILTRAP_TOKEN)
// sendVerificationEmail('muhammad.batch61@gmail.com', 125869)
export {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendResetPasswordEmail,
    sendPasswordResetSuccessEmail
}

