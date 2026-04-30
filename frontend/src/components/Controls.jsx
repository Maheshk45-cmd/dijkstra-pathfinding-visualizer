const MODES = [
  { id: 'add-node', icon: '⊕', label: 'Add Node' },
  { id: 'add-edge', icon: '⟶', label: 'Add Edge' },
  { id: 'move',     icon: '✦', label: 'Move'     },
  { id: 'delete',   icon: '⊗', label: 'Delete'   },
];

export default function Controls({
  mode, onModeChange,
  nodes, sourceId, targetId, onSetSource, onSetTarget,
  onRun, onReset, onClear,
  isRunning, isDone,
  speed, onSpeedChange,
}) {
  const canRun = nodes.length >= 2 && sourceId && !isRunning;

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="app-header">
        <div className="app-title">Dijkstra Visualizer</div>
        <div className="app-subtitle">Shortest Path · Graph Studio</div>
      </div>

      {/* Mode selector */}
      <div className="panel">
        <div className="panel-title">Canvas Mode</div>
        <div className="mode-group">
          {MODES.map(m => (
            <button
              key={m.id}
              id={`mode-${m.id}`}
              className={`mode-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => onModeChange(m.id)}
              disabled={isRunning}
            >
              <span className="icon">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm config */}
      <div className="panel">
        <div className="panel-title">Algorithm</div>

        <div className="field">
          <label>Source Node</label>
          <select
            id="select-source"
            value={sourceId || ''}
            onChange={e => onSetSource(e.target.value || null)}
            disabled={isRunning}
          >
            <option value="">— Select source —</option>
            {nodes.map(n => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Target Node <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <select
            id="select-target"
            value={targetId || ''}
            onChange={e => onSetTarget(e.target.value || null)}
            disabled={isRunning}
          >
            <option value="">— All shortest paths —</option>
            {nodes.filter(n => n.id !== sourceId).map(n => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </div>

        {/* Speed */}
        <div className="speed-control" style={{ marginBottom: 14 }}>
          <div className="speed-label">
            <span>Speed</span>
            <span>{speed}ms / step</span>
          </div>
          <input
            id="speed-slider"
            type="range"
            min={100} max={1200} step={100}
            value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <div className="btn-group">
          <button
            id="btn-run"
            className="btn btn-primary"
            onClick={onRun}
            disabled={!canRun}
          >
            {isRunning ? '⏳ Running…' : '▶ Run Dijkstra'}
          </button>
          <button
            id="btn-reset"
            className="btn btn-secondary"
            onClick={onReset}
            disabled={isRunning && !isDone}
          >
            ↺ Reset Visualization
          </button>
          <button
            id="btn-clear"
            className="btn btn-danger"
            onClick={onClear}
            disabled={isRunning}
          >
            ✕ Clear Graph
          </button>
        </div>
      </div>
    </div>
  );
}
