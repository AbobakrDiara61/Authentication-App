import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader, ArrowLeft, Mail } from "lucide-react";
import FormContext from '../context/FormContext'
import useAuth from '../hooks/useAuth';



const ForgotPasswordPage = () => {
  const { state, dispatch, ACTIONS, isLoading } = useContext(FormContext);
  const { email } = state;
  const [ submitted, setSubmitted ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const { forgotPassword } = useAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    setSubmitted(true);
    if (res) {
      setSent(true);
    }
  }

  return (
    <section className="container flex items-center justify-center">
        <div className="w-full md:max-w-lg bg-gray-900/50 backdrop-blur-xs pt-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center">Forgot Password</h2>
          <p className='text-slate-400 text-center max-md:max-w-sm mx-auto my-4'>Enter your email address and we'll send you a link to reset your password.</p>
            { !submitted ? (
              <form className='flex flex-col px-5 mt-5' onSubmit={(e) => handleForgotPassword(e)}>
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
                <button type="submit" disabled={isLoading} className='main-btn'>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form> 
            ) : (
              <div className="flex flex-col items-center gap-5 animate-fade-in">
                <div className={`size-12 rounded-full ${sent ? "bg-emerald-500" : "bg-red-500"} flex items-center justify-center`}>
                  <Mail className='size-6 text-white'/>
                </div>
                <p className='text-white text-sm text-center max-md:max-w-sm mx-auto'>
                   {sent ? <>Check your email: <span className='text-emerald-500'>{email}</span> for a reset link</> : <>
                    <p>Email: <span className='text-slate-300'>{email}</span> not found</p>
                    <button onClick={() => setSubmitted(false)} className='main-btn py-1'>Try Again</button>
                   </>}
                </p>
              </div>
            )}
          <div className='bg-gray-950/70 mt-5 py-2.5'>
            <Link to='/login' className='text-emerald-500 bg-linear-to-l ml-2 flex items-center justify-center gap-2'><ArrowLeft className='text-emerald-600'/> Back to Login</Link>
          </div>
        </div>
    </section>
  )
}

export default ForgotPasswordPage;