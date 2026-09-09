import { motion } from 'motion/react';
import Ball from "./Ball"

const AuthLayout = ({ title, subtitle, children, footer, wide = false }) => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950/80">

      <Ball
        dynamicStyles='-top-40 -left-40 size-96 bg-emerald-500 blur-3xl'
        opacity='opacity-5'
      />
      <Ball
        dynamicStyles='top-1/2  -right-32 size-80 bg-teal-400 blur-3xl'
        opacity='opacity-5'
      />
      <Ball
        dynamicStyles='bottom-0 left-1/3 size-72 bg-cyan-500 blur-3xl'
        opacity='opacity-5'
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`
          relative z-10 w-full
          ${wide ? "max-w-xl" : "max-w-md"}
          rounded-2xl overflow-hidden
          border border-white/10 bg-slate-900/80
          backdrop-blur-2xl
          shadow-2xl shadow-emerald-500/10
        `}
      >
        <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />

        {(title || subtitle) && (
          <div className="px-4 pt-8 text-center mb-5">
            {title && (
              <h2 className="text-gradient font-bold text-2xl md:text-3xl text-center tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm text-slate-400 max-w-72 mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="px-8 pb-6">{children}</div>

        {footer && (
          <div className="border-t border-white/20 bg-slate-950/40 px-4 py-4 text-center text-sm text-slate-400">
            {footer}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default AuthLayout;