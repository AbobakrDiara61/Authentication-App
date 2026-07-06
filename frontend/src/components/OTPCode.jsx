import { useRef } from 'react'

const OTPCode = ({ otp, setOtp }) => {
  const otpRefs = useRef([]);
  
  const handleChange = (e, index) => {
    // Handle pasted values
/*     if(e.target.value.length > 1) {
      let newOtp = e.target.value.split('');
      if(newOtp.length < otp.length) {
        newOtp = [...newOtp, ...Array(otp.length - newOtp.length).fill('')];
      }
      setOtp(newOtp);
    } */
   const newCode = [...otp];
    if(e.target.value.length > 1) {
      for(let i = 0; i < e.target.value.length && index + i < otp.length; i++) {
        newCode[index + i] = e.target.value[i];
      }
    }
    else
      newCode[index] = e.target.value;
    setOtp(newCode);
    
    const inputsArray = otpRefs.current;
    if(e.target.value !== '' && index < otp.length - 1) 
      inputsArray[index + 1].focus();
  }  
  const handleKeyDown = (e, index) => {
    const key = e.key;
    const inputsArray = otpRefs.current;
    switch (key) {
      case 'Backspace':
        if(index > 0 && e.target.value === '') {
          inputsArray[index - 1].focus();
          e.preventDefault();
        }
        break;
      case 'ArrowRight':
        if(index < otp.length - 1) 
          inputsArray[index + 1].focus();
        break;
      case 'ArrowLeft':
        if(index > 0)
          inputsArray[index - 1].focus();
        break;
      default:
        break;
    }
  }
  
  return (
    <div className='flex justify-center items-center gap-2'>
        {otp.map((_, index) => 
          <input 
            type='text' 
            key={`otp-${index}`}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => otpRefs.current[index] = el}
            className='size-12 bg-slate-800/60 hover:bg-slate-700/40 focus:bg-slate-600/40 border border-slate-400/60 hover:border-emerald-500/50 focus:border-emerald-500 text-2xl text-white font-bold rounded-lg text-center transition-all duration-300'
          />
        )}
    </div>
  )
}

export default OTPCode