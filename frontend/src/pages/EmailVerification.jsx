import { useContext, useRef, useState } from 'react'
import OTPCode from '../components/OTPCode'
import FormContext from '../context/FormContext'
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';

const EmailVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const { state } = useContext(FormContext);
  const { isLoading } = state;
  const verifying = useRef(false);
  const { verify, resendOTP } = useAuth();

  const handleVerifying = async (e) => {
    e.preventDefault();
    const success = await verify(otp.join(''));
    if(!success) setOtp(Array(6).fill(''));
  }

  useEffect(() => {
    const verifyOTP = async () => {
      if (otp.every(digit => digit !== '') && !verifying.current) {
        verifying.current = true;
        const success = await verify(otp.join(''));
        verifying.current = false;
        if(!success) setOtp(Array(6).fill(''));
      }
    };

    verifyOTP();
  }, [otp, verify]);
  return (
    <AuthLayout
      title='Verify Your Email'
      subtitle='Enter the 6-digit code sent to your email address'
      footer={`Didn't get the code? Check your spam folder`}
      wide={true}
    >
      <form className='flex flex-col' onSubmit={(e) => handleVerifying(e)}>
        <OTPCode {...{otp, setOtp}}/>
        <p className='text-sm text-center text-slate-400 mt-2'>
          If you haven't received the code, 
          <button type='button' disabled={isLoading} className="cursor-pointer text-emerald-600 mx-1 hover:text-emerald-400 transition-all duration-200" onClick={async () => await resendOTP()}>
            click here to resend it.
          </button>
        </p>
        <button type="submit" disabled={isLoading} className='main-btn mb-0'>
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default EmailVerification