import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

// Main Pages
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
// Auth Pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import EmailVerification from './pages/EmailVerification'
// Common Components & Pages
import PageNotFound from './pages/PageNotFound'
import Ball from './components/Ball'
import Spinner from './components/Spinner';

import RedirectHome from './utils/RedirectHome';
import PrivateRoutes from './utils/PrivateRoutes';

import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';
import About from './pages/About';

function App() {
  const { checkAuth } = useAuth();
  const { loading, stopLoading } = useContext(AuthContext);

  useEffect(() => {
    const onLoad = async () => {
      await checkAuth();
      stopLoading();
    }
    onLoad();
  }, [])

  if (loading) return <Spinner />;
  
  return (
    <main className='relative flex justify-center items-center w-full min-h-screen main-bg overflow-hidden'>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route> 
        <Route element={<RedirectHome />}>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
          <Route path='/email-verify' element={<EmailVerification />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Ball dynamicStyles='bg-green-500 size-64 -top-1/20 left-1/10 shadow-green-500/40 animate-moving'/>
      <Ball dynamicStyles='bg-emerald-500 size-48 top-7/10 left-4/5 shadow-emerald-500/40 delay-500 animate-moving'/>
      <Ball dynamicStyles='bg-lime-500 size-32 top-2/5 -left-1/10 shadow-lime-500/40 delay-800 animate-moving'/>
    </main>
  )
}

export default App
