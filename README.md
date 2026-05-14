# This is the changed project title
## Description
This is an interactive Dijkstra's shortest path visualizer. It allows users to add nodes, draw edges, and watch the algorithm run step-by-step.

## Installation
To install the project, follow these steps:
1. Clone the repository using `git clone`.
2. Install the required dependencies using `npm install`.
3. Start the server using `node server.js`.
4. Start the frontend development server using `npm run dev`.

## Usage Examples
Here are some examples of how to use the project:
* Add nodes by clicking on the canvas in "Add Node" mode.
* Draw edges by clicking on two nodes in "Add Edge" mode.
* Run the Dijkstra's algorithm by selecting a source node and clicking the "Run Dijkstra" button.
* Reset the visualization by clicking the "Reset Visualization" button.
* Clear the graph by clicking the "Clear Graph" button.

## API Reference
The project has the following API endpoints:
* `POST /api/graph/shortest-path`: Run the Dijkstra's algorithm on the given graph.
* `POST /api/graph/save`: Save a graph to the database.
* `GET /api/graph/:id`: Load a saved graph from the database.
* `GET /api/graph/`: List all saved graphs.

## Example API Request
Here is an example of how to run the Dijkstra's algorithm using the API:
```javascript
const nodes = [
  { id: 'A', x: 100, y: 100 },
  { id: 'B', x: 200, y: 200 },
  { id: 'C', x: 300, y: 300 },
];

const edges = [
  { from: 'A', to: 'B', weight: 5 },
  { from: 'B', to: 'C', weight: 3 },
  { from: 'A', to: 'C', weight: 7 },
];

const sourceId = 'A';
const targetId = 'C';

fetch('/api/graph/shortest-path', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nodes, edges, sourceId, targetId }),
})
  .then(response => response.json())
  .then(result => console.log(result));
```
This will run the Dijkstra's algorithm on the given graph and log the result to the console.

## License
This project is licensed under the MIT License.