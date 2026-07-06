import React from 'react'

const Card = ({ className, children }) => {
  return (
    <div className={`${className} p-4 rounded-xl bg-slate-800/40 shadow-md shadow-transparent hover:shadow-emerald-500/20 border border-slate-700 hover:border-emerald-500/40 transition-all`}>
      {children}
    </div>
  )
}

export default Card
