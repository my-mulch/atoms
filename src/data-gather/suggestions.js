const axios = require("axios")

function suggestions (key) {
    // console.log("THIS IS THE KEY:", key)
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${key}&format=json&_=1502826454683`)
        .then(wbpage => wbpage.data)
        .then(data => {
            return data.query.search.map(searchItem => {
                return searchItem.title
            })
        })
}

module.exports = suggestions


