import { useState, useEffect } from 'react';

export function useTypewriter(strings = [], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    if (!strings.length) return;
    const current = strings[index % strings.length];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseTime);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setIndex(i => i + 1);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, strings, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}
