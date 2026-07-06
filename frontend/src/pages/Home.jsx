import { Link } from 'react-router-dom'
import { Github, Linkedin, Briefcase, LayoutDashboard } from "lucide-react";
import MainLayout from '../components/MainLayout';

const Home = () => {
  return (
    <MainLayout 
      title='Welcome To Our Authentication App'
      footer={<>
          About this app 
          <Link to='/about' className='main-link ml-2'>
            Learn more
          </Link>
      </>}
    >
      <div className="size-full group">        
        <div className="size-64 mx-auto mt-6 mb-15 p-1 rounded-full overflow-hidden bg-gray-950 border-2 border-emerald-500/50 group-hover:border-emerald-500 shadow-xl shadow-green-400/10 group-hover:shadow-green-400/25 scale-100 group-hover:scale-110 transition-all duration-300">
          <img 
            src="https://res.cloudinary.com/dzmnrmrvs/image/upload/v1776685936/20250131_161116_1_vxyszm.jpg"
            alt="Profile" 
            className="size-full object-cover rounded-full"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        
        <div className="flex justify-center space-x-5 mb-6">
          <a 
            href="https://github.com/AbobakrDiara61" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Github className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-abobakr-970338343/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Linkedin className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a>
          <a 
            href="https://yourportfolio.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Briefcase className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a>
        </div>

        <Link 
          to="/dashboard" 
          className="ghost-btn py-4"
        >
          <LayoutDashboard className='size-5' />
          Go to Dashboard
        </Link>
      </div>
    </MainLayout>
  )
}

export default Home