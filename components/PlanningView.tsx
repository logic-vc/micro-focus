
import React, { useState } from 'react';
import { Task } from '../types';

interface PlanningViewProps {
  tasks: Task[];
  onAdd: (title: string, duration: number) => void;
  onRemove: (id: string) => void;
  onStart: () => void;
}

const PRESETS = [2, 5, 10, 30, 60];
const MIN_DURATION = 2;
const MAX_DURATION = 120;

export const PlanningView: React.FC<PlanningViewProps> = ({ tasks, onAdd, onRemove, onStart }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const finalDuration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration));
    onAdd(title, finalDuration);
    setTitle('');
    setDuration(0);
  };

  const addTime = (minutes: number) => {
    setDuration(prev => Math.min(MAX_DURATION, prev + minutes));
  };

  const resetTime = () => setDuration(0);

  return (
    <div className="w-full max-w-xl py-8 md:py-12 px-5 space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-y-auto max-h-screen no-scrollbar">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] text-white">
          MICRO-<span className="text-blue-500">FOCUS</span>
        </h1>
        <p className="text-slate-500 text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed opacity-80">
          Silence the Noise. <br/>Control the Seconds.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-[#16213e] p-6 md:p-8 rounded-[2rem] border border-slate-800/50 shadow-2xl space-y-6 md:space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Current Objective</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Focus on..."
            className="w-full bg-[#1a1a2e]/50 border border-slate-800 rounded-2xl p-4 md:p-5 text-base md:text-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Time Commitment</label>
            <button 
              type="button" 
              onClick={resetTime}
              className="text-[10px] font-black text-slate-600 hover:text-blue-400 uppercase tracking-widest transition-colors"
            >
              Clear
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-1.5 md:gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => addTime(preset)}
                className="py-3 md:py-4 rounded-xl font-bold transition-all text-[10px] md:text-xs bg-[#1a1a2e] text-slate-400 hover:bg-blue-600 hover:text-white active:scale-95 border border-slate-800"
              >
                +{preset}m
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-stretch pt-2">
            <div className="flex-1 flex items-center bg-[#1a1a2e] rounded-2xl px-3 sm:px-4 border border-slate-800 group focus-within:ring-2 focus-within:ring-blue-500 transition-all h-14 md:h-16 overflow-hidden">
              <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase mr-1 md:mr-2 shrink-0">Total</span>
              <input
                type="number"
                min="0"
                max={MAX_DURATION}
                value={duration || ''}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="flex-1 min-w-0 bg-transparent border-none text-white text-right font-timer outline-none text-lg md:text-2xl font-bold px-1"
              />
              <span className="text-[9px] md:text-[10px] font-black text-slate-500 ml-1 md:ml-2 shrink-0">MIN</span>
            </div>
            <button
              type="submit"
              disabled={!title.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white font-black p-4 rounded-2xl px-8 md:px-10 transition-all active:scale-95 shadow-xl shadow-blue-900/40 h-14 md:h-16 uppercase text-[10px] md:text-xs tracking-widest whitespace-nowrap"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Planned Sequence</h2>
        {tasks.length === 0 ? (
          <div className="text-center py-12 md:py-16 border-2 border-dashed border-slate-800/50 rounded-[2rem] text-slate-600 text-sm font-medium">
            The schedule is empty.
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li 
                key={task.id} 
                className="group flex items-center justify-between bg-[#16213e]/40 p-4 md:p-5 rounded-2xl border border-slate-800/50 hover:bg-[#16213e] hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#1a1a2e] flex items-center justify-center text-xs md:text-sm font-bold text-blue-400 border border-slate-800 shadow-inner shrink-0">
                    {task.durationMinutes}m
                  </div>
                  <span className="font-semibold text-slate-200 text-base md:text-lg tracking-tight truncate">{task.title}</span>
                </div>
                <button
                  onClick={() => onRemove(task.id)}
                  className="p-2 text-slate-600 hover:text-red-400 transition-all md:opacity-0 md:group-hover:opacity-100 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {tasks.length > 0 && (
        <button
          onClick={onStart}
          className="w-full bg-white text-[#1a1a2e] font-black p-5 md:p-6 rounded-3xl hover:bg-blue-50 transition-all active:scale-[0.97] shadow-2xl shadow-white/5 uppercase tracking-[0.2em] text-xs md:text-sm sticky bottom-4 z-10"
        >
          Begin Focus Session
        </button>
      )}
    </div>
  );
};
