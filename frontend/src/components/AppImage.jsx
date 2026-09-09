import { useState } from 'react';
import { UserRound } from 'lucide-react';

const AppImage = ({
  src,
  alt = 'Profile',
  size = 'size-64',
  fallbackIcon: FallbackIcon = UserRound,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className={`${size} mx-auto mt-6 mb-15 p-1 rounded-full overflow-hidden bg-gray-950 border-2 border-emerald-500/50 group-hover:border-emerald-500 shadow-xl shadow-green-400/10 group-hover:shadow-green-400/25 scale-100 group-hover:scale-110 transition-all duration-300 relative`}
    >
      {loading && !error && (
        <div className="absolute inset-0 rounded-full bg-gray-800 animate-pulse" />
      )}

      {error ? (
        <div className="size-full flex items-center justify-center rounded-full bg-gray-900">
          {FallbackIcon && <FallbackIcon className="text-slate-500" size={48} strokeWidth={1.5} />}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`size-full object-cover rounded-full saturate-90 group-hover:saturate-120 transition-all duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
};

export default AppImage;