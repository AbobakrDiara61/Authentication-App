import { Link } from 'react-router-dom'
import { Github, Linkedin, Youtube, Briefcase, Image as ImageIcon, LayoutDashboard } from "lucide-react";

const Home = () => {
  return (
    <section className="container flex items-center justify-center z-10">
      <div className="w-full md:max-w-xl bg-gray-900/80 backdrop-blur-xs py-5 rounded-2xl overflow-hidden group">
        <h2 className="text-gradient from-green-400 to-emerald-500 font-bold text-2xl md:text-3xl text-center">Welcome To Our Authentication App</h2>
        
        <div className="relative size-32 mx-auto mt-6 mb-4 rounded-full overflow-hidden bg-gray-800 border-2 border-emerald-500/50 group-hover:border-emerald-500 shadow-lg group-hover:shadow-green-400/20 group-hover:scale-110 transition-all duration-300">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <ImageIcon size={32} />
            <span className="text-xs mt-1">Image URL</span>
          </div>
          <img 
            src={null} 
            alt="Profile" 
            className="size-full object-cover relative z-10"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          <a 
            href="https://github.com/AbobakrDiara61" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Github className="text-slate-300 hover:text-white" size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-abobakr-970338343/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="text-slate-300 hover:text-white" size={24} />
          </a>
          <a 
            href="https://yourportfolio.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Briefcase className="text-slate-300 hover:text-white" size={24} />
          </a>
{/*           <a 
            href="https://www.youtube.com/channel/UCgHdsZWsjx9idAwS9TqGQqg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-red-600/80 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Youtube className="text-slate-300 hover:text-white" size={24} />
          </a> */}
        </div>

        {/* Dashboard Link */}
        <div className="px-5 mb-4">
          <Link 
            to="/dashboard" 
            className="main-btn flex items-center justify-center gap-2"
          >
            <LayoutDashboard size={20} />
            Go to Dashboard
          </Link>
        </div>

        <p className='text-slate-400 py-2 px-8 flex justify-between items-center'>
          Need an account? 
          <Link to='/register' className='text-gradient from-emerald-500 to-emerald-600 hover:underline ml-2'>
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Home