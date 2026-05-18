import React from 'react'
import { Link } from 'react-router-dom'

const PageNoteFound = () => {
  return (
    <section className='overflow-hidden bg-slate-900 flex justify-between w-full min-h-screen'>
      <div className='flex-1 flex flex-col justify-between pt-25'>
        <img 
          className='size-12 ml-5'
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
          alt="tailwind logo"
        />
        <div className='px-5'>
          <span className='text-lg text-indigo-400 mb-5'>404</span>
          <h1 className='text-white text-5xl lg:text-7xl font-medium mb-5'>Page not found</h1>
          <p className='text-slate-300 mb-2'>Sorry, we couldn't find the page you're looking for.</p>
          <Link to="/" className='text-indigo-400'>Back to home</Link>
        </div>

        <div className='bg-slate-800/50 text-slate-300 flex gap-8 py-10 px-5 border-t-4 border-slate-800'>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className='max-md:hidden flex-1 max-h-screen'>
        <img 
          className='w-full h-full object-cover object-center'
          // src="beautiful-photorealistic-moon.jpg" 
          src="photorealistic-moon-with-abstract-landscape.jpg" 
          alt="beautiful-photorealistic-moon" 
        />
      </div>
    </section>
  )
}

export default PageNoteFound