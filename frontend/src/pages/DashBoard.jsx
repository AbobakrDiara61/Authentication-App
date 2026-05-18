import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import useAuth from '../hooks/useAuth'


const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const { signout, deleteAccount } = useAuth();
  const logout = async () => await signout();
  const deleteAcc = async () => await deleteAccount();
  return (
    <section className="container flex items-center justify-center z-10">
        <div className="w-full md:max-w-lg bg-gray-900 backdrop-blur-xs px-5 py-5 rounded-2xl overflow-hidden">
          <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center mb-4">Dashboard</h2>
          {user && <div className='flex flex-col gap-5 *:p-2'>
            <div className='bg-gray-800/50 text-slate-400 border border-gray-700 rounded-md'>
                <h2 className='text-emerald-500 font-medium text-xl mb-2'>Profile Information</h2>
                <p>Name: <span>{user.name}</span></p>
                <p>Email: <span>{user.email}</span></p>
            </div>
            <div className='bg-gray-800/50 text-slate-300 border border-gray-700 rounded-md'>
                <h2 className='text-emerald-500 font-medium text-xl mb-2'>Account Activity</h2>
                <p className='*:text-slate-400 *:ml-3'>Joined: <span>{new Date(Date.parse(user.createdAt)).toLocaleString()}</span></p>
                {user.lastLoginAt && <p className='*:text-slate-400 *:ml-3'>Last login: <span>{new Date(Date.parse(user.lastLoginAt)).toLocaleString()}</span></p>}
            </div>
            <div className="flex justify-between items-center *:flex-1 space-x-5">
              <button onClick={logout} className='main-btn'>Logout</button>
              <button onClick={deleteAcc} className='main-btn'>Delete Account</button>
            </div>
          </div>
          }

        </div>
    </section>
  )
}

export default DashBoard