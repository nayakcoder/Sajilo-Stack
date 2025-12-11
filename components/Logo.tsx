import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeOpacity="0.2" />
      <path 
        d="M50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
    </svg>
  );
};