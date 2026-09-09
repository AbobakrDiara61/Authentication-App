import { Link } from 'react-router-dom'
import { Github, Linkedin, Briefcase, LayoutDashboard } from "lucide-react";
import MainLayout from '../components/MainLayout';
import AppImage from '../components/AppImage';

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

        <Link 
          to="/about" 
          className='outline-0'
        >
          <AppImage 
              src="https://res.cloudinary.com/dzmnrmrvs/image/upload/v1788953991/2151883579_wmxg3x.jpg"
              alt="Profile"
          />
        </Link>
        
        <div className="flex justify-center space-x-5 mb-4">
          <a 
            href="https://github.com/AbobakrDiara61" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Github className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-abobakr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Linkedin className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a>
{/*           <a 
            href="https://yourportfolio.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn group/icon"
          >
            <Briefcase className="text-slate-300 group-hover/icon:text-emerald-500 transition-colors duration-300" size={24} />
          </a> */}
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