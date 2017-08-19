const axios = require("axios")

function suggest(key) {

    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${key}&format=json&_=1502826454683`)
        .then(wbpage => wbpage.data)
        .then(data => {
            return data.query.search.map(searchItem => {
                return searchItem.title
            })
        })
}

module.exports = suggest


