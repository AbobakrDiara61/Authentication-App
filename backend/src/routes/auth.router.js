import express from "express";
import authControllers from "../controllers/auth.controller.js";
import authentication from "../middlewares/authentication.js";
const { signup, login, logout, sendOTP, deleteAccount, forgotPassword, resetPassword, checkAuthentication } = authControllers;
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authentication, logout);
router.delete('/account-deletion', authentication, deleteAccount);
router.post('/verify', authentication, sendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/check-auth', authentication, checkAuthentication);

export default router