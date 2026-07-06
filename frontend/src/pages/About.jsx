import { Link } from 'react-router-dom'
import { Route, ArrowRight } from 'lucide-react'
import MainLayout from '../components/MainLayout'
import { techStack, features, steps } from '../constants/index'
import Card from '../components/Card'

const About = () => {
  return (
    <MainLayout
      title="About This Project"
      footer={
        <>
          Want to try it?
          <Link to="/register" className="main-link ml-2">
            Create an account
          </Link>
        </>
      }
      wide={true}
      className='max-w-2xl'
    >
      <div className="space-y-4 mt-4 text-left">

        <div className="rounded-xl border border-emerald-500/30 bg-slate-800/40 p-4 border-l-2 border-l-emerald-500">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">About this project</p>
          <p className="text-slate-200 text-sm font-medium leading-relaxed">
            Developed a secure full-stack authentication system using the MERN stack, featuring user registration, 
            login, and protected routes. Implemented robust session management via JWT, 
            including password recovery (forgot/reset workflows) and secure token.
          </p>
          <p className="text-white/60 text-sm mt-1">
            A practical, production-ready starter for any web app that needs secure user accounts.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(techStack).map(([layer, items]) => (
            <Card>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3">{layer}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(tech => (
                  <span
                    key={tech}
                    className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>


        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Key features</p>
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              {icon}
              <div>
                <p className="text-slate-200 text-sm font-medium">{title}</p>
                <p className="text-white/60 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">How it works</p>
          <div className="space-y-3">
            {steps.map(({ n, title, desc }, i) => (
              <div key={`${n}-step`} className={`flex f gap-3 pb-3 ${i < steps.length - 1 ? 'border-b border-slate-700' : ''}`}>
                <div className="size-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-medium shrink-0">
                  {n}
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-medium">{title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Link to="/" className="ghost-btn py-3">
          <ArrowRight className="size-4" />
          Return Home
        </Link>

      </div>
    </MainLayout>
  )
}

export default About