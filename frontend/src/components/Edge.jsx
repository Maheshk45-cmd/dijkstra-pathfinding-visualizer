export default function Edge({ edge, from, to, state, onDelete, mode }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;

  const isPath = state === 'path';

  const strokeColor = isPath ? '#f59e0b' : 'rgba(255,255,255,0.12)';
  const strokeWidth = isPath ? 3 : 1.5;
  const labelColor  = isPath ? '#f59e0b' : '#64748b';

  return (
    <g>
      <line
        x1={from.x} y1={from.y}
        x2={to.x}   y2={to.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        filter={isPath ? 'url(#glow-amber)' : 'none'}
        className={`edge-line ${isPath ? 'edge-path-animated' : ''}`}
      />
      {/* Invisible wide hit target for deletion */}
      {mode === 'delete' && (
        <line
          x1={from.x} y1={from.y} x2={to.x} y2={to.y}
          stroke="transparent" strokeWidth={12}
          style={{ cursor: 'pointer' }}
          onClick={onDelete}
        />
      )}
      <text
        x={mx} y={my - 8}
        textAnchor="middle"
        fill={labelColor}
        className="edge-weight"
      >
        {edge.weight}
      </text>
    </g>
  );
}
