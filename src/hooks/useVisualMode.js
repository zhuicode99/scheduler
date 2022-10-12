import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace) { 
      setMode(newMode);
    } else {
      setMode(newMode) 
      setHistory(prev => [...prev, newMode])
    }
  }

  function back() {
    history.pop()

    if (history.length > 0) {
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}