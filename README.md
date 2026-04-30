# Dijkstra's Pathfinding Visualizer

An interactive, portfolio-grade **shortest path visualizer** built with the MERN stack. Add nodes, connect them with weighted edges, and watch Dijkstra's algorithm traverse the graph step-by-step with smooth animations.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## Features

- **Interactive Graph Editor** — click to add nodes, drag to reposition, click two nodes to add weighted edges
- **Step-by-step Visualization** — watch Dijkstra visit nodes and relax edges in real time
- **Adjustable Speed** — control animation speed from 100ms to 1200ms per step
- **Distance Panel** — live distance table updates as the algorithm runs
- **Final Path Highlight** — shortest path rendered in amber with animated edge strokes
- **Save/Load** — persist graphs to MongoDB via REST API (optional)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + SVG Canvas |
| Styling | Vanilla CSS (custom design system) |
| Algorithm | Dijkstra with Min-Heap Priority Queue |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose (optional) |

## Project Structure

```
Dijkstra_Project/
├── backend/
│   ├── src/
│   │   ├── dijkstra.js        # Clean Dijkstra + min-heap
│   │   ├── routes/graph.js    # REST API endpoints
│   │   └── models/Graph.js    # Mongoose schema
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/        # Canvas, Node, Edge, Controls, InfoPanel
    │   ├── hooks/             # useGraph, useVisualization
    │   ├── utils/dijkstra.js  # Frontend algorithm (client-side viz)
    │   └── App.jsx
    └── index.html
```

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env   # set MONGO_URI if you want persistence
npm run dev            # starts on :5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # starts on :5173
```

Open [http://localhost:5173](http://localhost:5173)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/graph/shortest-path` | Run Dijkstra, returns steps + path |
| `POST` | `/api/graph/save` | Save graph to MongoDB |
| `GET`  | `/api/graph/:id` | Load saved graph |
| `GET`  | `/api/graph` | List all saved graphs |

## How It Works

1. Dijkstra runs **client-side** for instant, lag-free visualization
2. The backend exposes the same algorithm as a REST API
3. The visualization engine receives an array of **steps**, each describing which node was visited and current distances
4. A `setInterval` ticker advances through steps at the configured speed
5. React state drives SVG visual updates: glow filters, stroke colors, and animated dash offsets

## Algorithm Complexity

- Time: **O((V + E) log V)** with min-heap
- Space: **O(V)** for distances/previous arrays

---

*Built as a portfolio project demonstrating MERN stack, graph algorithms, and interactive data visualization.*
