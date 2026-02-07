
import React from 'react';

interface GreetingViewProps {
  message: string;
}

const GreetingView: React.FC<GreetingViewProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#0a0a0c] fade-in">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-serif italic text-slate-300 tracking-wider">
          {message}
        </h1>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto opacity-50" />
      </div>
    </div>
  );
};

export default GreetingView;
