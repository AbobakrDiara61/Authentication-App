import { useContext, useState } from 'react'
import { Lock } from "lucide-react";
import { toast } from 'react-hot-toast';
import FormContext from '../context/FormContext'
import PasswordTracker from '../components/PasswordTracker'
import useAuth from '../hooks/useAuth';


const ResetPasswordPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { password, isLoading } = state;
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    await resetPassword({ password });
  }

  return (
    <section className="container flex items-center justify-center">
        <div className="w-full md:max-w-lg bg-gray-900/50 backdrop-blur-xs flex flex-col justify-between pt-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center">Reset Password</h2>
          <form className='flex flex-col px-5 mt-5' onSubmit={(e) => handleResetPassword(e)}>
            <div className="input-wrapper">
              <Lock/>
              <input 
                type="password" placeholder='New Password' value={password} 
                onChange={(e) => dispatch({
                  type: ACTIONS.CHANGE,
                  field: "password",
                  value: e.target.value
                })}
              />
            </div>
            <div className="input-wrapper">
              <Lock/>
              <input 
                type="password" placeholder='Confirm New Password' value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <PasswordTracker />
            <button type="submit" disabled={isLoading} className='main-btn'>
              {isLoading ? "Reseting..." : "Set New Password"}
            </button>
          </form>
        </div>
    </section>
  )
}

export default ResetPasswordPage