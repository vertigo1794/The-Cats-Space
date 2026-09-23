import React from 'react';

interface CatsLogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Clean "cats" wordmark: a brush-script name with simple, precisely aligned
 * cat ears above it and a soft curled tail beside it.
 */
export const CatsLogo: React.FC<CatsLogoProps> = ({ className = 'w-72 md:w-96', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none transition-transform duration-300 hover:scale-105 ${className}`}
      role="img"
      aria-label="cats - Ocean Whiskers"
    >
      {/* Wordmark + tail */}
      <div className="relative">
        <span
          className="block text-white text-6xl md:text-8xl leading-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          cats
        </span>

        <svg
          viewBox="0 0 60 60"
          className="absolute -right-8 md:-right-10 top-1/3 w-10 md:w-14 drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          fill="none"
        >
          <path
            d="M 4 4 C 30 4, 50 18, 46 36 C 44 46, 34 50, 26 46"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
