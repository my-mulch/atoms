const axios = require("axios")
const cheerio = require("cheerio")

function suggestions (key) {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${key}&format=json&_=1502826454683`)
        .then(wbpage => wbpage.data)
        .then(data => {
            const suggestions = data.query.search.map(searchItem => {
                // console.log(searchItem.title);
                return searchItem.title
            })
            console.log(key, suggestions)
            return suggestions
        })
}

let string = 'lollipop'
let query = ''
for (let i = 0; i < string.length; i++) {
    query += string.charAt(i)
    suggestions(query)
}