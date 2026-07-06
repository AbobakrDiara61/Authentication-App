import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Lock } from "lucide-react";
import { toast } from 'react-hot-toast';
import FormContext from '../context/FormContext'
import PasswordTracker from '../components/PasswordTracker'
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';


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
    <AuthLayout
      title='Reset Password'
      footer={<>Remember your password? <Link to='/login' className='main-link ml-2'>Back to Login</Link></>}
    >
      <form className='flex flex-col' onSubmit={(e) => handleResetPassword(e)}>
        <Input
          icon={Lock}
          type="password" placeholder='New Password' value={password}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "password",
            value: e.target.value
          })}
        />
        <Input
          icon={Lock}
          type="password" placeholder='Confirm New Password' value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <PasswordTracker />
        <button type="submit" disabled={isLoading} className='main-btn'>
          {isLoading ? "Reseting..." : "Set New Password"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ResetPasswordPage