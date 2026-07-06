const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative mb-6'>
      <div className="absolute pl-10 left-0 top-1/2 -translate-1/2 pointer-events-none">
        <Icon className="size-5 text-green-500" />  
      </div>
      <input 
        {...props}
        className='w-full py-2 pl-10 pr-3 rounded-sm bg-slate-950 text-white placeholder-gray-400 ring-1 ring-transparent focus:ring-green-500 transition-all duration-300'
      />
    </div>
  )
}

export default Input
