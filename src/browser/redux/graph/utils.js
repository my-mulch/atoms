export default function findOrCreate(node) {
    // finds node in given context
    return this[node]
        // in this case our context is the sibling file graph (index.js)
        ? this[node]
        // each graph item has an id and adjacency list
        : this[node] = { id: node, adj: [] }
}
