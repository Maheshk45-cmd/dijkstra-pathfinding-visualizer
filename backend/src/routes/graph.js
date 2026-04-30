const express = require('express');
const router = express.Router();
const { dijkstra } = require('../dijkstra');
const Graph = require('../models/Graph');

// Run shortest path calculation
router.post('/shortest-path', (req, res) => {
  const { nodes, edges, sourceId, targetId } = req.body;
  if (!nodes || !edges || !sourceId) {
    return res.status(400).json({ error: 'nodes, edges, and sourceId are required' });
  }
  const result = dijkstra(nodes, edges, sourceId, targetId || null);
  res.json(result);
});

// Save a graph to MongoDB
router.post('/save', async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    const graph = await Graph.create({ name, nodes, edges });
    res.status(201).json(graph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Load a saved graph
router.get('/:id', async (req, res) => {
  try {
    const graph = await Graph.findById(req.params.id);
    if (!graph) return res.status(404).json({ error: 'Graph not found' });
    res.json(graph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all saved graphs
router.get('/', async (req, res) => {
  try {
    const graphs = await Graph.find({}, 'name createdAt').sort('-createdAt');
    res.json(graphs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
