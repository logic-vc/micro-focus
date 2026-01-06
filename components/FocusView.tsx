
import React, { useState, useEffect } from 'react';
import { Task } from '../types.ts';

interface FocusViewProps {
  tasks: Task[];
  currentIndex: number;
  onComplete: () => void;
  onExit: () => void;
}

export const FocusView: React.FC<FocusViewProps> = ({ tasks, currentIndex, onComplete, onExit }) => {
  const currentTask = tasks[currentIndex];
  const nextTask = tasks[currentIndex + 1];
  
  const [timeLeft, setTimeLeft] = useState(currentTask.durationMinutes * 60);
  const [isAlerting, setIsAlerting] = useState(false);

  useEffect(() => {
    setTimeLeft(currentTask.durationMinutes * 60);
    setIsAlerting(false);
  }, [currentTask]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsAlerting(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentageRemaining = (timeLeft / (currentTask.durationMinutes * 60)) * 100;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-700 bg-[#1a1a2e] ${isAlerting ? 'animate-alert' : ''}`}>
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16213e]/20 to-transparent pointer-events-none" />
      
      <button 
        onClick={onExit}
        className="absolute top-8 md:top-12 right-8 md:right-12 text-slate-600 hover:text-slate-300 transition-colors uppercase text-[9px] md:text-[10px] font-black tracking-[0.3em] z-20"
      >
        Abort Session
      </button>

      <div className="relative z-10 text-center w-full px-6 md:px-8 max-w-6xl flex flex-col items-center">
        {/* Active Objective */}
        <div className="space-y-3 mb-4 md:mb-8 w-full max-w-lg md:max-w-none">
           <span className="text-blue-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] opacity-80 block animate-pulse">Present Reality</span>
           <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight transition-all duration-500 drop-shadow-lg break-words px-4">
            {currentTask.title}
          </h2>
        </div>

        {/* Massive Timer (Monospaced to prevent jumping) */}
        <div className="font-timer text-[4.5rem] sm:text-[9rem] md:text-[15rem] lg:text-[19rem] font-bold leading-none text-white transition-all duration-700 select-none drop-shadow-[0_0_50px_rgba(59,130,246,0.15)]">
          {formatTime(Math.max(0, timeLeft))}
        </div>

        {/* Future Preview */}
        <div className="mt-8 md:mt-12 transition-all duration-1000 h-16 md:h-24 px-4 w-full">
          {nextTask ? (
            <div className="space-y-1.5 md:space-y-2 opacity-30">
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Next Horizon</p>
              <h3 className="text-lg md:text-3xl lg:text-4xl font-bold text-slate-400 tracking-tighter truncate max-w-xs mx-auto md:max-w-none">
                {nextTask.title}
              </h3>
            </div>
          ) : (
            <div className="opacity-20 flex flex-col items-center space-y-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <p className="text-[10px] md:text-lg font-bold text-slate-400 tracking-[0.2em] italic uppercase">
                Final Mission
              </p>
            </div>
          )}
        </div>

        {/* Interaction */}
        <div className="mt-12 md:mt-24">
          <button
            onClick={onComplete}
            className={`text-[10px] md:text-sm font-black py-5 md:py-6 px-16 md:px-24 rounded-full transition-all active:scale-95 uppercase tracking-[0.3em] shadow-2xl ${
              isAlerting 
                ? 'bg-red-600 text-white shadow-red-900/40 animate-pulse' 
                : 'bg-white text-[#1a1a2e] hover:bg-blue-50 hover:shadow-white/10'
            }`}
          >
            {isAlerting ? 'Transcend' : 'Accomplished'}
          </button>
        </div>
      </div>

      {/* Modern Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 md:h-3 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-linear relative" 
          style={{ width: `${percentageRemaining}%` }} 
        >
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-blue-400 blur-md opacity-40" />
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="hidden lg:flex absolute left-8 md:left-12 top-1/2 -translate-y-1/2 flex-col gap-8 opacity-5 pointer-events-none">
        <div className="h-32 w-[1px] bg-slate-400" />
        <div className="h-32 w-[1px] bg-slate-400" />
      </div>
      <div className="hidden lg:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex-col gap-8 opacity-5 pointer-events-none">
        <div className="h-32 w-[1px] bg-slate-400" />
        <div className="h-32 w-[1px] bg-slate-400" />
      </div>
    </div>
  );
};
