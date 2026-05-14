# Dijkstra Visualizer
A web application for visualizing Dijkstra's algorithm on a graph.

## Description
This project provides a interactive graph editor and a Dijkstra's algorithm visualizer. Users can create and edit graphs, select source and target nodes, and run the algorithm to find the shortest path.

## Installation
To run the application, follow these steps:
1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in the project root directory.
3. Start the backend server by running `node backend/server.js` in the terminal.
4. Start the frontend development server by running `npm run dev` in the terminal.
5. Open your web browser and navigate to `http://localhost:5173` to access the application.

## Usage Examples
* Create a new graph by clicking on the "Add Node" button and adding nodes to the canvas.
* Add edges between nodes by clicking on the "Add Edge" button and selecting two nodes.
* Select a source node and a target node (optional) using the dropdown menus.
* Run the Dijkstra's algorithm by clicking on the "Run Dijkstra" button.
* Visualize the algorithm's progress by observing the changing node colors and edge highlights.

## API Reference
The backend API provides the following endpoints:
* `POST /api/graph/shortest-path`: Run Dijkstra's algorithm on a given graph.
	+ Request Body: `{ nodes: [], edges: [], sourceId: string, targetId: string }`
	+ Response: `{ steps: [], distances: {}, path: [] }`
* `POST /api/graph/save`: Save a graph to the database.
	+ Request Body: `{ name: string, nodes: [], edges: [] }`
	+ Response: `{ id: string, name: string, nodes: [], edges: [] }`
* `GET /api/graph/:id`: Retrieve a saved graph by ID.
	+ Response: `{ id: string, name: string, nodes: [], edges: [] }`
* `GET /api/graph`: Retrieve a list of all saved graphs.
	+ Response: `[ { id: string, name: string, createdAt: string } ]`

## License
This project is licensed under the MIT License. See LICENSE for details.