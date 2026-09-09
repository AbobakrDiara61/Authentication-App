import { useContext } from 'react'
import api from '../utils/api'
import { toast } from 'react-hot-toast'
import AuthContext from '../context/AuthContext';
import FormContext from '../context/FormContext';
import { useLocation, useNavigate/* , useParams */ } from 'react-router-dom';


const useAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, login, logout, updateUser } = useContext(AuthContext);
    const { load, stopLoading, reset } = useContext(FormContext);

    const register = async (user) => {
        try {
            load();
            const response = await api.post('/auth/signup', user, {
                withCredentials: true
            });
            login(response.data.user);
            console.log({ response });
            toast.success(response.data.message);
            navigate('/email-verify');
        } catch (error) {
            console.error({ message: "Error in register", error });
            toast.error(error.response.data.message || "Error in Signing up");
        } finally {
            stopLoading();
        }
    };

    const signin = async (user) => {
        try {
            load();
            const response = await api.post("/auth/login", user);
            login(response.data.user);
            toast.success(response.data.message);
            navigate('/email-verify');

        } catch (error) {
            console.error({ message: "Error in signin", error });
            toast.error(error.response.data.message || "Error in logging in");
        } finally {
            stopLoading();
        }
    }

    const verify = async (code) => {
        try {
            load();
            const response = await api.post("/auth/verify", { code });
            login({ ...user, isVerified: true })
            toast.success(response.data.message);
            navigate('/');
            return true;
        } catch (error) {
            console.error({ message: "HERE Error in verify", error });
            toast.error(error.response.data.message || "Error in Verifying The Account");
            return false;
        } finally {
            stopLoading();
        }
    }

    const signout = async () => {
        try {
            load();
            const response = await api.post("/auth/logout");
            logout();
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error({ message: "Error in signout Hook", error });
            toast.error(error.response.data.message || "Error in logging out");
        } finally {
            stopLoading();
        }
    }

    const deleteAccount = async () => {
        try {
            load();
            const response = await api.delete("/auth/account-deletion");
            logout();
            toast.success(response.data.message);
            navigate('/register');
        } catch (error) {
            console.error({ message: "Error in deleteAccount", error });
            toast.error(error.response.data.message || "Error in Deleting The Account");
        } finally {
            stopLoading();
        }
    }

    const forgotPassword = async (email) => {
        try {
            load();
            const response = await api.post("/auth/forgot-password", { email });
            toast.success(response.data.message);
            return true;
        } catch (error) {
            console.error({ message: "Error in forgotPassword", error });
            toast.error(error.response.data.message || "Error in sending forgot password request");
            return false;
        } finally {
            stopLoading();
        }
    }

    const resetPassword = async ({ password }) => {
        try {
            // const { token } = useParams();
            const token = location.pathname.split("/").slice(-1).join('');
            // const token = location.pathname.lastIndexOf("/");
            load();
            const response = await api.post("/auth/reset-password", { password, token }, {
                withCredentials: true
            });
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error({ message: "Error in resetPassword Hook", error });
            toast.error(error.response.data.message || "Error in reseting password of The Account");
        } finally {
            stopLoading();
        }
    }

    const checkAuth = async () => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await api.get("/auth/check-auth", {}, {
                withCredentials: true
            });
            toast.success(response.data.message); // for debugging only
            login(response.data.user);

        } catch (error) {
            logout();
            console.error({ error });
            toast.error("User is not authenticated");
        }
    }

    const resendOTP = async () => {
        try {
            load();
            const response = await api.post("/auth/generate-otp", {}, {
                withCredentials: true
            });
            toast.success(response.data.message);
        } catch (error) {
            logout();
            console.error({ error });
            toast.error(error.response.data.message || "Error in generating OTP of The Account");
        } finally {
            stopLoading();
        }
    }

    const changeEmail = async (email) => {
        try {
            load();
            const response = await api.post("/auth/change-email", { email }, {
                withCredentials: true
            });
            toast.success(response.data.message);
            updateUser({ email });
            navigate('/dashboard');
            reset();
        } catch (error) {
            console.error({ error });
            toast.error(error.response.data.message || "Failed to change the email.");
        } finally {
            stopLoading();
        }
    }

    return { register, signin, verify, signout, deleteAccount, forgotPassword, resetPassword, checkAuth, resendOTP, changeEmail };
}

export default useAuth;