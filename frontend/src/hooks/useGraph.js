import { useState, useCallback } from 'react';

let counter = 0;
const LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const nextLabel = () => {
  const i = counter++;
  return i < 26 ? LABELS[i] : LABELS[Math.floor(i / 26) - 1] + LABELS[i % 26];
};

export function useGraph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addNode = useCallback((x, y) => {
    const node = { id: `n_${Date.now()}`, label: nextLabel(), x, y };
    setNodes(prev => [...prev, node]);
  }, []);

  const moveNode = useCallback((id, x, y) => {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, x, y } : n)));
  }, []);

  const deleteNode = useCallback((id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
  }, []);

  const addEdge = useCallback((from, to, weight) => {
    setEdges(prev => {
      const exists = prev.some(
        e => (e.from === from && e.to === to) || (e.from === to && e.to === from)
      );
      if (exists) return prev;
      return [...prev, { id: `e_${from}_${to}`, from, to, weight }];
    });
  }, []);

  const deleteEdge = useCallback((id) => {
    setEdges(prev => prev.filter(e => e.id !== id));
  }, []);

  const clearGraph = useCallback(() => {
    counter = 0;
    setNodes([]);
    setEdges([]);
  }, []);

  return { nodes, edges, addNode, moveNode, deleteNode, addEdge, deleteEdge, clearGraph };
}
