function getNodeStyle(state, isSource, isTarget) {
  if (state === 'path')     return { fill: '#2d1f02', stroke: '#f59e0b', strokeWidth: 2.5, filter: 'url(#glow-amber)' };
  if (state === 'visiting') return { fill: '#1e1b4b', stroke: '#8b5cf6', strokeWidth: 2.5, filter: 'url(#glow-violet)' };
  if (state === 'relaxing') return { fill: '#0f2545', stroke: '#4f8ef7', strokeWidth: 2,   filter: 'url(#glow-blue)' };
  if (state === 'visited')  return { fill: '#1a2537', stroke: '#334a66', strokeWidth: 1.5, filter: 'none' };
  if (isSource)             return { fill: '#1a1040', stroke: '#8b5cf6', strokeWidth: 2.5, filter: 'url(#glow-violet)' };
  if (isTarget)             return { fill: '#2d1f02', stroke: '#f59e0b', strokeWidth: 2,   filter: 'url(#glow-amber)' };
  return                           { fill: '#1a2537', stroke: '#4f8ef7', strokeWidth: 1.5, filter: 'none' };
}

function getLabelColor(state, isSource, isTarget) {
  if (state === 'path' || isTarget)             return '#f59e0b';
  if (state === 'visiting' || isSource)         return '#8b5cf6';
  if (state === 'relaxing')                     return '#4f8ef7';
  return '#f1f5f9';
}

export default function Node({ node, state, isSource, isTarget, isPending, distance, onClick, onMouseDown, onDelete, mode }) {
  const style = getNodeStyle(state, isSource, isTarget);
  const labelColor = getLabelColor(state, isSource, isTarget);
  const R = 22;

  const distLabel = distance === undefined || distance === Infinity ? '' : distance;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onDoubleClick={mode === 'delete' ? onDelete : undefined}
      style={{ cursor: mode === 'move' ? 'grab' : mode === 'delete' ? 'pointer' : 'pointer' }}
    >
      {/* Outer glow ring for pending edge selection */}
      {isPending && (
        <circle r={R + 6} fill="none" stroke="#4f8ef7" strokeWidth={1} opacity={0.5}
          style={{ animation: 'pulse-ring 1s ease infinite' }} />
      )}

      <circle
        r={R}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        filter={style.filter}
        className="node-circle"
      />

      <text
        textAnchor="middle"
        dominantBaseline="central"
        y={distLabel ? -5 : 0}
        fill={labelColor}
        className="node-label"
      >
        {node.label}
      </text>

      {distLabel !== '' && (
        <text textAnchor="middle" dominantBaseline="central" y={10} className="node-distance">
          {distLabel}
        </text>
      )}
    </g>
  );
}
