import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Lock, Mail, User } from "lucide-react";
import FormContext from '../context/FormContext'
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout'
import Input from '../components/Input'


const LoginPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { email, password, isLoading } = state;
  const { signin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signin({ email, password });
  }

  return (
    <AuthLayout
      title='Welcome Back'
      footer={<>Don't have an account? <Link to='/register' className='main-link ml-2'>Sign Up</Link></>}
    >
      <form className='flex flex-col' onSubmit={(e) => handleLogin(e)}>
        <Input 
          icon={Mail}
          type="email" placeholder='Email Address' value={email} 
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "email",
            value: e.target.value
          })}
        />
        <Input 
          icon={Lock}
          type="password" placeholder='Password' value={password} 
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "password",
            value: e.target.value
          })}
        />

        <Link to='/forgot-password' className='text-emerald-500 hover:text-emerald-400 hover:underline underline-offset-2 transition-all '>Forget Password?</Link>
        <button type="submit" disabled={isLoading} className='main-btn'>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage