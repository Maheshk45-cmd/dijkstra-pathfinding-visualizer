import { useState, useRef, useCallback } from 'react';

export function useVisualization() {
  const [vizState, setVizState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback((steps, finalPath, speedMs = 500) => {
    let i = 0;
    setIsRunning(true);
    setIsDone(false);

    timerRef.current = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(timerRef.current);
        setVizState({ visiting: null, relaxing: null, visited: steps[steps.length - 1]?.visited ?? [], distances: steps[steps.length - 1]?.distances ?? {}, path: finalPath });
        setIsRunning(false);
        setIsDone(true);
        return;
      }
      const step = steps[i++];
      setVizState({ visiting: step.visiting, relaxing: step.relaxing, visited: step.visited, distances: step.distances, path: [] });
    }, speedMs);
  }, []);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setVizState(null);
    setIsRunning(false);
    setIsDone(false);
  }, []);

  return { vizState, isRunning, isDone, start, reset };
}
