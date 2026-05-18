import { useContext, useState } from 'react'
import OTPCode from '../components/OTPCode'
import FormContext from '../context/FormContext'
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const EmailVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const { state } = useContext(FormContext);
  const { isLoading } = state;
  const { verify, resendOTP } = useAuth();

  const handleVerifying = async (e) => {
    e.preventDefault();
    await verify(otp.join(''));
  }

  useEffect(() => {

    if(otp.filter(digit => digit !== '').length === otp.length) 
      handleVerifying(new Event('submit'));
    
  }, [ otp ]);
  return (
    <section className="container flex items-center justify-center">
        <div className="w-full md:max-w-lg bg-gray-900/50 backdrop-blur-xs pt-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center">Verify Your Email</h2>
          <p className='text-center text-slate-400 mt-2'>Enter the 6-digit code sent to your email address</p>
          <form className='flex flex-col px-5 mt-5' onSubmit={(e) => handleVerifying(e)}>
            <OTPCode {...{otp, setOtp}}/>
            <p className='text-sm text-center text-slate-400 mt-2'>
              If you haven't received the code, 
              <button type='button' disabled={isLoading} className="cursor-pointer text-emerald-600 mx-1 hover:text-emerald-400 transition-all duration-200" onClick={async () => await resendOTP()}>
                click here to resend it.
              </button>
            </p>
            <button type="submit" disabled={isLoading} className='main-btn'>
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

        </div>
    </section>
  )
}

export default EmailVerification