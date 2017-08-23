// access wikipedia api and perform function `handle` on result
const wikiApi = (query, handle) => (
    require("axios")
        .get(`https://en.wikipedia.org/w/api.php`, {
            params: {
                action: 'query',
                list: 'search',
                srsearch: query,
                format: 'json',
                _: '1502826454683'
            }
        })
        .then(handle)
)

module.exports = wikiApi