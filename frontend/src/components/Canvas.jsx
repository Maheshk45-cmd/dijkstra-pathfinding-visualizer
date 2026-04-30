import { useRef, useState, useCallback } from 'react';
import Node from './Node';
import Edge from './Edge';
import WeightModal from './WeightModal';

const HINTS = {
  'add-node': 'Click anywhere to add a node',
  'add-edge': 'Click a node, then another to create an edge',
  'move':     'Drag nodes to reposition them',
  'delete':   'Click a node or edge to delete it',
};

export default function Canvas({
  nodes, edges, mode, vizState, isRunning,
  sourceId, targetId,
  onAddNode, onMoveNode, onAddEdge, onDeleteNode, onDeleteEdge,
}) {
  const svgRef = useRef(null);
  const [dragging, setDragging]     = useState(null); // { id, ox, oy }
  const [pendingEdge, setPendingEdge] = useState(null);
  const [modal, setModal]           = useState(null);  // { from, to }

  const svgPoint = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handleCanvasClick = (e) => {
    if (e.target !== svgRef.current) return;
    if (mode === 'add-node') {
      const { x, y } = svgPoint(e);
      onAddNode(x, y);
    }
    if (mode === 'add-edge') setPendingEdge(null);
  };

  const handleNodeClick = (id, e) => {
    e.stopPropagation();
    if (dragging) return;

    if (mode === 'delete') { onDeleteNode(id); return; }

    if (mode === 'add-edge') {
      if (!pendingEdge) { setPendingEdge(id); return; }
      if (pendingEdge === id) { setPendingEdge(null); return; }
      setModal({ from: pendingEdge, to: id });
      setPendingEdge(null);
    }
  };

  const handleNodeMouseDown = (id, e) => {
    if (mode !== 'move') return;
    e.preventDefault();
    const { x, y } = svgPoint(e);
    const node = nodes.find(n => n.id === id);
    setDragging({ id, ox: x - node.x, oy: y - node.y });
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const { x, y } = svgPoint(e);
    onMoveNode(dragging.id, x - dragging.ox, y - dragging.oy);
  }, [dragging, onMoveNode]);

  const handleMouseUp = () => setDragging(null);

  const handleEdgeConfirm = (weight) => {
    onAddEdge(modal.from, modal.to, weight);
    setModal(null);
  };

  const getNodeState = (id) => {
    if (!vizState) return 'default';
    if (vizState.path.includes(id)) return 'path';
    if (vizState.visiting === id)   return 'visiting';
    if (vizState.relaxing === id)   return 'relaxing';
    if (vizState.visited.includes(id)) return 'visited';
    return 'default';
  };

  const getEdgeState = (edge) => {
    if (!vizState || vizState.path.length < 2) return 'default';
    const p = vizState.path;
    for (let i = 0; i < p.length - 1; i++) {
      if ((p[i] === edge.from && p[i+1] === edge.to) ||
          (p[i] === edge.to   && p[i+1] === edge.from)) return 'path';
    }
    return 'default';
  };

  return (
    <>
      <svg
        ref={svgRef}
        className={`canvas canvas--${mode}`}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <filter id="glow-blue"   x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-amber"  x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Pending edge preview line */}
        {pendingEdge && (() => {
          const n = nodes.find(x => x.id === pendingEdge);
          return n ? (
            <circle cx={n.x} cy={n.y} r={28} fill="none" stroke="#4f8ef7"
              strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6} />
          ) : null;
        })()}

        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from);
          const to   = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <Edge key={edge.id} edge={edge} from={from} to={to}
              state={getEdgeState(edge)} mode={mode}
              onDelete={() => onDeleteEdge(edge.id)} />
          );
        })}

        {nodes.map(node => (
          <Node
            key={node.id}
            node={node}
            state={getNodeState(node.id)}
            isSource={node.id === sourceId}
            isTarget={node.id === targetId}
            isPending={node.id === pendingEdge}
            distance={vizState?.distances?.[node.id]}
            mode={mode}
            onClick={(e) => handleNodeClick(node.id, e)}
            onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
            onDelete={() => onDeleteNode(node.id)}
          />
        ))}
      </svg>

      <div className="canvas-hint">{HINTS[mode]}</div>

      {modal && (
        <WeightModal
          fromLabel={nodes.find(n => n.id === modal.from)?.label}
          toLabel={nodes.find(n => n.id === modal.to)?.label}
          onConfirm={handleEdgeConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </>
  );
}
