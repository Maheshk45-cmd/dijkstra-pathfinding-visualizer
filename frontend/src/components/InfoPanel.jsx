export default function InfoPanel({ vizState, isRunning, isDone, nodes }) {
  if (!vizState && !isRunning && !isDone) return null;

  const { distances = {}, path = [], visiting } = vizState || {};

  const sortedNodes = [...nodes].sort((a, b) => {
    const da = distances[a.id] ?? Infinity;
    const db = distances[b.id] ?? Infinity;
    return da - db;
  });

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      width: 220,
      background: 'rgba(13, 17, 23, 0.92)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: 16,
      backdropFilter: 'blur(12px)',
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto',
    }}>
      <div className="panel-title">Traversal Info</div>

      {(isRunning || isDone) && (
        <div className={`status-badge ${isDone ? 'done' : 'running'}`}>
          <div className="status-dot" />
          {isDone ? 'Complete' : 'Running…'}
        </div>
      )}

      <table className="distances-table">
        <thead>
          <tr><th>Node</th><th>Dist</th></tr>
        </thead>
        <tbody>
          {sortedNodes.map(node => {
            const d = distances[node.id];
            const onPath   = path.includes(node.id);
            const isCurrent = node.id === visiting;
            return (
              <tr key={node.id}
                className={onPath ? 'on-path' : isCurrent ? 'active' : d !== undefined ? 'visited' : ''}>
                <td>{node.label}</td>
                <td>{d === undefined || d === Infinity ? '∞' : d}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isDone && path.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div className="panel-title" style={{ marginBottom: 8 }}>Shortest Path</div>
          <div className="path-display">
            {path.map((id, i) => {
              const node = nodes.find(n => n.id === id);
              return (
                <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="path-node-badge">{node?.label}</span>
                  {i < path.length - 1 && <span className="path-arrow">→</span>}
                </span>
              );
            })}
          </div>
          <div className="path-cost" style={{ marginTop: 8 }}>
            Total Cost: <strong>{distances[path[path.length - 1]]}</strong>
          </div>
        </div>
      )}

      {isDone && path.length === 0 && (
        <p className="no-path" style={{ marginTop: 10 }}>No path to target.</p>
      )}
    </div>
  );
}
