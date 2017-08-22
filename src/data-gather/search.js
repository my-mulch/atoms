const axios = require('axios')
const cheerio = require('cheerio')

// div indicating ambiguous query. If array is empty, query was non-ambigous
const isAmbiguous = ($) => Array.from($('#disambigbox')).length > 0

const sanitize = (query) => (
    axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            action: 'query',
            list: 'search',
            srsearch: query,
            format: 'json',
            _: '1502826454683'
        }
    })
        // API handles fuzzy search queries
        .then(page => page.data.query.search[0].title)
)

const relate = (query) => (
    sanitize(query.replace(' ', '+'))
        .then(article =>
            axios.get(`https://en.wikipedia.org/wiki/${article}`)
                // cheerio provides jquery functionality
                // loads html into virtual DOM => '$'
                .then(res => {
                    const html = res.data
                    const $ = cheerio.load(html)
                    // bundle related links for front-end
                    return bundle(article,
                        isAmbiguous($)
                            // if article is ambigous return possibilites
                            ? disambiguate($)
                            // otherwise return related articles
                            : rank(relations($), html))
                })
        )
)

// bundle format for D3 rendering
const bundle = (article, relations) => ({
    title: article,
    relations: relations
})

// rank by occurence count in surrounding html
const rank = (relations, html) =>
    relations.sort((a, b) => occurrences(html, b) - occurrences(html, a))
        .slice(0, 8)

const relations = ($) => grabLinks($, 'p')
const disambiguate = ($) => grabLinks($, '#content ul')

// finds atags in a given context
const grabLinks = ($, context) => {
    const links = new Set()
    $(context).find('a').map((_, atag) => {
        if (atag.attribs.title)
            links.add(atag.attribs.title)
    })
    return Array.from(links)
}

const occurrences = (text, target) => {
    if (!(target && target.length)) return 0

    let n = 0, pos = 0
    while (true) {
        pos = text.indexOf(target, pos);
        if (pos >= 0) {
            ++n;
            pos += target.length;
        } else break;
    }
    return n;
}

module.exports = relate;
