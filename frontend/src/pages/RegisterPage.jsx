import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Lock, Mail, User } from "lucide-react";
import FormContext from '../context/FormContext'
import PasswordTracker from '../components/PasswordTracker'

import useAuth from '../hooks/useAuth';


const RegisterPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { name, email, password, isLoading } = state;
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  }

  return (
    <section className="container flex items-center justify-center">
        <div className="w-full md:max-w-lg bg-gray-900/50 backdrop-blur-xs flex flex-col justify-between pt-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center">Create Account</h2>
          <form className='flex flex-col px-5 mt-5' onSubmit={(e) => handleRegister(e)}>
            <div className="input-wrapper nth-last-3:mb-0">
              <User/>
              <input 
                type="text" placeholder='Burak' value={name} 
                onChange={(e) => dispatch({
                  type: ACTIONS.CHANGE,
                  field: "name",
                  value: e.target.value
                })}
              />
            </div>
            <div className="input-wrapper">
              <Mail/>
              <input 
                type="email" placeholder='devburakor@gmail.com' value={email} 
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
                type="password" placeholder='password' value={password} 
                onChange={(e) => dispatch({
                  type: ACTIONS.CHANGE,
                  field: "password",
                  value: e.target.value
                })}
              />
            </div>
            <PasswordTracker />
            <button type='submit' className='main-btn' disabled={isLoading}>
              {isLoading ? <Loader className='mx-auto animate-spin' /> : "Register"}
            </button>
            {/* <input type="submit" value={isLoading ? <Loader className='' /> : "Register"} className='main-btn' /> */}
          </form>
          <div className='bg-gray-950/70 mt-5'>
            <p className=' text-slate-400 py-2 px-8 text-center'>Already have an account? <Link to='/login' className='text-gradient from-emerald-500 to-emerald-600 hover:underline ml-2'>Login</Link></p>
          </div>
        </div>
    </section>
  )
}

export default RegisterPage