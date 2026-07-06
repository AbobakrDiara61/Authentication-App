import { ShieldCheck, UserPlus, Route, Database, Lock, ArrowRight, Mail, Key } from 'lucide-react'

const techStack = {
  frontend: ['React', 'Tailwind CSS', 'React Router'],
  backend: ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcryptjs', 'Nodemailer'],
}

const featureStyle = 'text-emerald-500 size-5 mt-0.5 shrink-0';

const features = [
  {
    icon: <UserPlus className={featureStyle} />,
    title: 'Register & Login',
    desc: 'Secure sign-up and login with bcrypt-hashed passwords',
  },
  {
    icon: <ShieldCheck className={featureStyle} />,
    title: 'JWT sessions',
    desc: 'Stateless authentication stored in HTTP-only cookies',
  },
  {
    icon: <Route className={featureStyle} />,
    title: 'Protected routes',
    desc: 'Dashboard and private pages gated behind auth middleware',
  },
  {
    icon: <Mail className={featureStyle} />,
    title: 'Password reset',
    desc: 'Receive email with special token URL to reset password securely',
  },
  {
    icon: <Key className={featureStyle} />,
    title: 'Encrypted passwords',
    desc: 'All passwords are encrypted using bcrypt',
  },
]

const steps = [
  { n: 1, title: 'Register an account', desc: 'Enter your name, email, and password on the Register page' },
  { n: 2, title: 'Log in', desc: 'A JWT is issued and stored securely in a cookie' },
  { n: 3, title: 'Access the dashboard', desc: 'Protected pages verify your token on every request' },
  { n: 4, title: 'Forgot password', desc: 'Request reset link via email with unique token' },
  { n: 5, title: 'Reset password', desc: 'Click special URL to access reset page and update your encrypted password' },
]

export {
    techStack,
    features,
    steps
}