import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Lock, Mail, User } from "lucide-react";
import FormContext from '../context/FormContext'
import PasswordTracker from '../components/PasswordTracker'
import AuthLayout from '../components/AuthLayout';

import useAuth from '../hooks/useAuth';
import Input from '../components/Input';


const RegisterPage = () => {
  const { state, dispatch, ACTIONS } = useContext(FormContext);
  const { name, email, password, isLoading } = state;
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  }

  return (
      <AuthLayout 
        title="Create Account" 
        footer={<>Already have an account? <Link to='/login' className='main-link ml-2'>Login</Link></>}
      >
        <form className='flex flex-col' onSubmit={(e) => handleRegister(e)}>
          <Input 
            icon={User}
            type="text" placeholder='Burak' value={name} 
            onChange={(e) => dispatch({
              type: ACTIONS.CHANGE,
              field: "name",
              value: e.target.value
            })}
          /> 
          <Input 
            icon={Mail}
            type="email" placeholder='devburakor@gmail.com' value={email} 
            onChange={(e) => dispatch({
              type: ACTIONS.CHANGE,
              field: "email",
              value: e.target.value
            })}
          />
          <Input 
            icon={Lock}
            type="password" placeholder='password' value={password} 
            onChange={(e) => dispatch({
              type: ACTIONS.CHANGE,
              field: "password",
              value: e.target.value
            })}
          />
          <PasswordTracker />
          <button type='submit' className='main-btn' disabled={isLoading}>
            {isLoading ? <Loader className='mx-auto animate-spin' /> : "Register"}
          </button>
        </form>
      </AuthLayout>
  )
}

export default RegisterPage