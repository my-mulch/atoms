// Hits wiki api for all articles containing partial query
const wikiApi = require('./utils')
module.exports = (query) => wikiApi(query,
    // function to apply to result from query
    res => res.data.query.search.map(item => item.title)) 