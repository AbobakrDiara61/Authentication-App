import { motion } from 'motion/react';
import Ball from './Ball'

const MainLayout = ({ children, title, footer, className, wide = false }) => {

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-2 py-6 md:py-2 relative overflow-hidden bg-linear-to-br from-black/80 via-slate-900/35 to-black/80">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`
          relative z-10 w-full
          ${wide ? '' : 'max-w-md'}
          rounded-3xl overflow-hidden
          bg-linear-to-bl from-black/80 via-black/20 to-black/80 ${className}
        `}
      >
        <Ball dynamicStyles='bg-white/40 size-80 -top-1/4 -left-1/4 z-0' opacity='opacity-10'/>
        <Ball dynamicStyles='bg-white/40 size-80 -bottom-1/4 -right-1/4 z-0' opacity='opacity-10'/>
        
        <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />

        {title && 
          <h2 className="relative z-10 text-gradient font-bold text-2xl md:text-3xl text-center pt-8">{title}</h2>
        }

        <div className="px-2 md:px-8 py-6 relative z-10">{children}</div>


        {footer && (
          <footer
            className="relative z-10 bg-black px-6 py-4 text-center text-sm text-white/70"
          >
            {footer}
          </footer>
        )}
      </motion.div>
    </section>
  );
};

export default MainLayout;