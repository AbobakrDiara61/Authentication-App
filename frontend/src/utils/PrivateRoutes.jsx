import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log({
        user,
        cond: user?.isVerified === false,
        isAuthenticated
    })
    if(!isAuthenticated)
        return <Navigate to="/login" />;
    
    if(user.isVerified === false)
        return <Navigate to="/email-verify" />;
    
    return <Outlet />
}

export default PrivateRoutes;
