import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Lock, Mail, User } from "lucide-react";
import FormContext from '../context/FormContext'
import PasswordTracker from '../components/PasswordTracker'
import useAuth from '../hooks/useAuth';


const LoginPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { email, password, isLoading } = state;
  const { signin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signin({ email, password });
  }

  return (
    <section className="container flex items-center justify-center">
        <div className="w-full md:max-w-lg bg-gray-900/50 backdrop-blur-xs pt-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center">Welcome Back</h2>
          <form className='flex flex-col px-5 mt-5' onSubmit={(e) => handleLogin(e)}>
            <div className="input-wrapper">
              <Mail/>
              <input 
                type="email" placeholder='Email Address' value={email} 
                onChange={(e) => dispatch({
                  type: ACTIONS.CHANGE,
                  field: "email",
                  value: e.target.value
                })}
              />
            </div>
            <div className="input-wrapper">
              <Lock/>
              <input 
                type="password" placeholder='Password' value={password} 
                onChange={(e) => dispatch({
                  type: ACTIONS.CHANGE,
                  field: "password",
                  value: e.target.value
                })}
              />
            </div>
            <Link to='/forgot-password' className='text-emerald-500 hover:text-emerald-400 hover:underline underline-offset-2 transition-all '>Forget Password?</Link>
            <button type="submit" disabled={isLoading} className='main-btn'>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className='bg-gray-950/70 mt-5'>
            <p className=' text-slate-400 py-2 px-1 text-center'>Don't have an account? <Link to='/register' className='text-gradient bg-linear-to-l ml-2'>Sign Up</Link></p>
          </div>
        </div>
    </section>
  )
}

export default LoginPage