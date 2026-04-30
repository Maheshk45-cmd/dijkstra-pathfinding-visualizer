import { useState } from 'react';
import { useGraph } from './hooks/useGraph';
import { useVisualization } from './hooks/useVisualization';
import { runDijkstra } from './utils/dijkstra';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';

export default function App() {
  const { nodes, edges, addNode, moveNode, deleteNode, addEdge, deleteEdge, clearGraph } = useGraph();
  const { vizState, isRunning, isDone, start, reset } = useVisualization();

  const [mode, setMode]       = useState('add-node');
  const [sourceId, setSourceId] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [speed, setSpeed]     = useState(500);

  const handleRun = () => {
    if (!sourceId || nodes.length < 2) return;
    const { steps, path } = runDijkstra(nodes, edges, sourceId, targetId);
    start(steps, path, speed);
  };

  const handleReset = () => {
    reset();
    setSourceId(null);
    setTargetId(null);
  };

  const handleClear = () => {
    reset();
    clearGraph();
    setSourceId(null);
    setTargetId(null);
  };

  const handleSetSource = (id) => {
    setSourceId(id);
    if (id === targetId) setTargetId(null);
  };

  return (
    <div className="app">
      <Controls
        mode={mode}
        onModeChange={setMode}
        nodes={nodes}
        sourceId={sourceId}
        targetId={targetId}
        onSetSource={handleSetSource}
        onSetTarget={setTargetId}
        onRun={handleRun}
        onReset={handleReset}
        onClear={handleClear}
        isRunning={isRunning}
        isDone={isDone}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      <div className="canvas-area">
        <Canvas
          nodes={nodes}
          edges={edges}
          mode={mode}
          vizState={vizState}
          isRunning={isRunning}
          sourceId={sourceId}
          targetId={targetId}
          onAddNode={addNode}
          onMoveNode={moveNode}
          onAddEdge={addEdge}
          onDeleteNode={deleteNode}
          onDeleteEdge={deleteEdge}
        />

        <InfoPanel
          vizState={vizState}
          isRunning={isRunning}
          isDone={isDone}
          nodes={nodes}
        />
      </div>
    </div>
  );
}
