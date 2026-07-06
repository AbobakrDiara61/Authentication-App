import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import useAuth from '../hooks/useAuth'
import MainLayout from '../components/MainLayout'
import { LogOut, Trash2, User, Mail, Clock, CalendarDays, ShieldAlert } from 'lucide-react'

const DataBlock = ({ icon: Icon, label, value }) => {
  return (
    <div className='flex items-center gap-2 mb-2 text-sm'>
        <Icon className="size-5 text-emerald-500" />
        <div>
          <p className='text-white/60 font-bold text-xs'>{label}</p>
          <p className='text-white font-medium'>{value}</p>
        </div>
    </div>
  );
}

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const { signout, deleteAccount } = useAuth();
  const logout = async () => await signout();
  const deleteAcc = async () => await deleteAccount();

  const actionButtonStyle = `flex justify-center items-center gap-2 py-2 px-4 font-medium rounded-md transition-all bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-500`;

  return (

    <MainLayout 
      title='Dashboard'
      footer='Your data is encrypted and secure'
    >
      {user && <div className='flex flex-col gap-5 *:px-5 *:py-3'>
        <div className='bg-gray-950/50 text-slate-400 border border-gray-700/60 rounded-md'>
            <h2 className='text-emerald-500 font-medium text-xl mb-2'>Profile Information</h2>
            <DataBlock icon={User} label='Name' value={user.name} />
            <DataBlock icon={Mail} label='Email' value={user.email} />
        </div>
        <div className='bg-gray-950/80 text-slate-300 border border-gray-700/60 rounded-md'>
            <h2 className='text-emerald-500 font-medium text-xl mb-2'>Account Activity</h2>
            <DataBlock icon={CalendarDays} label={'Joined'} value={new Date(Date.parse(user.createdAt)).toLocaleString()} />
            {user.lastLoginAt && 
              <DataBlock 
                icon={Clock} 
                label='Last Login' 
                value={new Date(Date.parse(user.lastLoginAt)).toLocaleString()} 
              />
            }
        </div>
      </div>
      }
      <div className="flex justify-between items-center *:flex-1 space-x-5 mt-5">
          <button onClick={logout} className={actionButtonStyle}>
            <LogOut className="size-4" />
            Logout
          </button>
          <button onClick={deleteAcc} className={`${actionButtonStyle} bg-red-600/20 hover:bg-red-500/15 text-red-500`}>
            <Trash2 className="size-4" />
            Delete Account
          </button>
      </div>
      <Link to='/' className={`${actionButtonStyle} mt-5 py-4`}>
        Return Home
      </Link>
    </MainLayout>
  )
}

export default DashBoard