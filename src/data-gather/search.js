const axios = require('axios')
const cheerio = require('cheerio')

// text indicating an ambiguous query. If our array is empty, we are clear.
const AMBIGUOUS = 'in Wiktionary, the free dictionary'
const isAmbiguous = ($) => Array.from($(`#content:contains(${AMBIGUOUS})`)).length > 0

const sanitize = (query) => (
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&_=1502826454683`)
        // API handles fuzzy search queries
        .then(page => page.data.query.search[0].title)
)

const relate = (query) => (
    sanitize(query.replace(' ', '+'))
        .then(article =>
            axios.get(`https://en.wikipedia.org/wiki/${article}`)
                // cheerio provides node.js with jquery functionality
                // load html into virtual DOM => '$'
                .then(res => {
                    const html = res.data
                    const $ = cheerio.load(html)
                    return bundle(article,
                        isAmbiguous($)
                            // show possible links to user
                            ? disambiguate($)
                            // rank links by relevance
                            : rank(html, relations($))
                    )
                })
        )
)

// bundle format for D3 rendering
const bundle = (article, relations) => ({ name: article, children: relations })

// rank links by occurence count in surrounding html
const rank = (html, relations, fn) => (
    relations
        .map(relation => ({ numOccur: occurrences(html, relation), name: relation }))
        .sort((a, b) => b.numOccur - a.numOccur).slice(0, 8)
)

const relations = ($) => grabLinks($, 'p')
const disambiguate = ($) => grabLinks($, '#content ul').slice(0, 10)

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