const axios = require('axios')
const cheerio = require('cheerio')

// text indicating an ambiguous query. If our array is empty we are clear.
const AMBIGUOUS = 'in Wiktionary, the free dictionary'
const isAmbiguous = $ => Array.from($(`#content:contains(${AMBIGUOUS})`)).length > 0

const sanitize = (query) => (
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&_=1502826454683`)
        // API handles fuzzy search queries
        .then(page => page.data.query.search[0].title)
)
const grabLinks = ($, context) => {
    const links = new Set()
    $(context).find('a').map((_, atag) =>
        links.add(atag.attribs.title))
    return links
}
const relations = ($) => grabLinks($, 'p')
const disambiguate = ($) => grabLinks($, '#content ul')

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

const bundle = (article, relations) => ({ article, children: relations })

const rank = (html, relations) => (
    Array.from(relations)
        .map(relation => ({ numOccur: occurrences(html, relation), relation }))
        .sort((a, b) => b.numOccur - a.numOccur).slice(0, 8)
)

const relate = (query) => (
    sanitize(query.replace(' ', '+'))
        .then(article =>
            axios.get(`https://en.wikipedia.org/wiki/${article}`)
                // cheerio provides node with jquery functionality
                // we load the html into a virtual DOM
                .then(res => {
                    const html = res.data
                    const $ = cheerio.load(html)
                    return bundle(article,
                        isAmbiguous($)
                            // show possible links to user
                            ? disambiguate($)
                            // select only links to other wiki pages
                            : rank(html, relations($))
                    )
                })
        )
)

relate('tidal wave').then(console.log)
module.exports = relate;