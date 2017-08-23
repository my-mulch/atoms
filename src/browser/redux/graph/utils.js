
export default function findOrCreate(node) {
  // finds node in given context
  return this.all[node]
      // in this case our context is the sibling file graph (index.js)
      ? this.all[node]
      // each graph item has an id and adjacency list
      : this.all[node] = this.updated.nodes[node] = { id: node, adj: [] }
}