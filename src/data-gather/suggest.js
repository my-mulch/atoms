// Hits wiki api for all articles containing partial query
module.exports = partial => (
    require("axios")
        .get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${partial}&format=json&_=1502826454683`)
        .then(res => res.data.query.search.map(item => item.title))
)