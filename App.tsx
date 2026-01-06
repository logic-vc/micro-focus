
import React, { useState, useCallback } from 'react';
import { PlanningView } from './components/PlanningView';
import { FocusView } from './components/FocusView';
import { Task, AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.PLANNING);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const addTask = (title: string, durationMinutes: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      durationMinutes,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const startFocus = () => {
    if (tasks.length > 0) {
      setCurrentTaskIndex(0);
      setMode(AppMode.FOCUSING);
    }
  };

  const nextTask = useCallback(() => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      setMode(AppMode.PLANNING);
      setTasks([]); // Clear list after finishing all
    }
  }, [currentTaskIndex, tasks.length]);

  const exitFocus = () => {
    setMode(AppMode.PLANNING);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1a1a1a]">
      {mode === AppMode.PLANNING ? (
        <PlanningView 
          tasks={tasks} 
          onAdd={addTask} 
          onRemove={removeTask} 
          onStart={startFocus} 
        />
      ) : (
        <FocusView 
          tasks={tasks} 
          currentIndex={currentTaskIndex} 
          onComplete={nextTask} 
          onExit={exitFocus}
        />
      )}

      {/* Branding Footer */}
      <footer className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <p className="text-[#666] opacity-50 text-[10px] md:text-xs font-light tracking-[0.25em] uppercase whitespace-nowrap">
          Powered by VOCAL LOGIC HELPER
        </p>
      </footer>
    </div>
  );
};

export default App;
