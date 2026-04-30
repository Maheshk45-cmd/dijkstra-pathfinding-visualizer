class MinHeap {
  constructor() { this.data = []; }

  push(item) {
    this.data.push(item);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) { this.data[0] = last; this._sinkDown(0); }
    return top;
  }

  isEmpty() { return this.data.length === 0; }

  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p].dist <= this.data[i].dist) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  _sinkDown(i) {
    const n = this.data.length;
    while (true) {
      let min = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.data[l].dist < this.data[min].dist) min = l;
      if (r < n && this.data[r].dist < this.data[min].dist) min = r;
      if (min === i) break;
      [this.data[min], this.data[i]] = [this.data[i], this.data[min]];
      i = min;
    }
  }
}

export function runDijkstra(nodes, edges, sourceId, targetId) {
  const adj = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    adj[e.from].push({ to: e.to, weight: e.weight });
    adj[e.to].push({ to: e.from, weight: e.weight });
  });

  const dist = {};
  const prev = {};
  nodes.forEach(n => { dist[n.id] = Infinity; prev[n.id] = null; });
  dist[sourceId] = 0;

  const visited = new Set();
  const steps = [];
  const pq = new MinHeap();
  pq.push({ node: sourceId, dist: 0 });

  while (!pq.isEmpty()) {
    const { node: u } = pq.pop();
    if (visited.has(u)) continue;
    visited.add(u);

    steps.push({ visiting: u, relaxing: null, visited: [...visited], distances: { ...dist } });

    if (u === targetId) break;

    for (const { to: v, weight } of adj[u]) {
      if (visited.has(v)) continue;
      const newDist = dist[u] + weight;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        prev[v] = u;
        pq.push({ node: v, dist: newDist });
        steps.push({ visiting: u, relaxing: v, visited: [...visited], distances: { ...dist } });
      }
    }
  }

  const path = [];
  if (targetId && dist[targetId] !== Infinity) {
    let curr = targetId;
    while (curr !== null) { path.unshift(curr); curr = prev[curr]; }
  }

  return { steps, distances: dist, path };
}
