import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';


// redirect authenticated users to home page
const RedirectHome = ({ children }) => {
  const { user, isAuthenticated }  = useContext(AuthContext)
/*   
  if(isAuthenticated && user?.isVerified)
    return <Navigate to="/" replace />   */

  return <Outlet />
}

export default RedirectHome;