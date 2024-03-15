class PriorityQueue {
  constructor() {
      this.queue = [];
  }

  enqueue(element, priority) {
      this.queue.push({ element, priority });
      this.sort();
  }

  dequeue() {
      if (this.isEmpty()) {
          return null;
      }
      return this.queue.shift().element;
  }

  isEmpty() {
      return this.queue.length === 0;
  }

  sort() {
      this.queue.sort((a, b) => a.priority - b.priority);
  }
}

export default class Graph {
  constructor() {
      this.vertices = {};
  }

  addVertex(vertex) {
      if (!this.vertices[vertex]) {
          this.vertices[vertex] = {};
      }
  }

  addEdge(vertex1, vertex2, weight) {
      this.vertices[vertex1][vertex2] = weight;
      this.vertices[vertex2][vertex1] = weight; // If it's an undirected graph
  }

  dijkstra(startVertex) {
      const distances = {};
      const visited = {};
      const pq = new PriorityQueue();

      // Initialize distances
      for (const vertex in this.vertices) {
          distances[vertex] = Infinity;
      }
      distances[startVertex] = 0;

      pq.enqueue(startVertex, 0);

      while (!pq.isEmpty()) {
          const currentVertex = pq.dequeue();
          visited[currentVertex] = true;

          for (const neighbor in this.vertices[currentVertex]) {
              const weight = this.vertices[currentVertex][neighbor];
              const totalDistance = distances[currentVertex] + weight;

              if (totalDistance < distances[neighbor]) {
                  distances[neighbor] = totalDistance;
                  if (!visited[neighbor]) {
                      pq.enqueue(neighbor, totalDistance);
                  }
              }
          }
      }

      return distances;
  }
}

// Example usage:
const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 7);
graph.addEdge("B", "E", 20);
graph.addEdge("C", "D", 5);
graph.addEdge("C", "E", 35);
graph.addEdge("B", "D", 15);
graph.addEdge("D", "F", 20);
graph.addEdge("E", "F", 10);

console.log(graph.dijkstra("A"));
