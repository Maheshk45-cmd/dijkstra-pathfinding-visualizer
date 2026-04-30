const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  from: String,
  to: String,
  weight: Number,
});

const nodeSchema = new mongoose.Schema({
  id: String,
  label: String,
  x: Number,
  y: Number,
});

const graphSchema = new mongoose.Schema({
  name: { type: String, default: 'Untitled Graph' },
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Graph', graphSchema);
