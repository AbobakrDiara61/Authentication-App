import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Mail } from "lucide-react";
import FormContext from '../context/FormContext'
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout'
import Input from '../components/Input'


const ChangeEmailPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { email, confirmEmail, isLoading } = state;
  const { changeEmail } = useAuth();
  const [error, setError] = useState('');

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !confirmEmail) {
      setError('Please fill in both fields');
      return;
    }

    if (email !== confirmEmail) {
      setError('Emails do not match');
      return;
    }

    await changeEmail(email);
  }

  return (
    <AuthLayout
      title='Change Email'
    >
      <form className='flex flex-col' onSubmit={(e) => handleChangeEmail(e)}>
        <Input 
          icon={Mail}
          type="email" placeholder='New Email Address' value={email} 
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "email",
            value: e.target.value
          })}
        />
        <Input 
          icon={Mail}
          type="email" placeholder='Confirm Email Address' value={confirmEmail} 
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "confirmEmail",
            value: e.target.value
          })}
        />

        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

        <button type="submit" disabled={isLoading} className='main-btn mt-4'>
          {isLoading ? "Updating..." : "Change Email"}
        </button>

        <Link 
          to="/dashboard" 
          className="ghost-btn py-4"
        >
          <LayoutDashboard className='size-5' />
          Go to Dashboard
        </Link>
      </form>
    </AuthLayout>
  )
}

export default ChangeEmailPage