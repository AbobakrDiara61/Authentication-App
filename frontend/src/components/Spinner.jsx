const Spinner = () => {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-center items-center gap-6 bg-black/95 backdrop-blur-sm">

      <div className="relative size-24 flex items-center justify-center">

        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-400 border-b-green-800 animate-spin [animation-duration:2400ms] shadow-[0_0_14px_rgba(74,222,128,0.35)]" />
        <div className="absolute inset-3.5 rounded-full border border-transparent border-b-green-300 border-l-green-700 animate-spin [animation-direction:reverse] [animation-duration:1600ms]" />
        <div className="absolute inset-7 rounded-full border border-transparent border-t-green-100 animate-spin [animation-duration:900ms]" />

        <div className="size-2.5 rounded-full bg-green-400 shadow-[0_0_10px_3px_rgba(74,222,128,0.6)] animate-pulse" />
      </div>

      <span className="font-serif text-xs tracking-[0.25em] uppercase text-green-300 opacity-70 animate-pulse">
        Loading
      </span>

    </div>
  );
};

export default Spinner;