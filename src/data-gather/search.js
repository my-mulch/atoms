const axios = require('axios')
const cheerio = require('cheerio')
const wikiApi = require('./utils')

// div indicating ambiguous query. If array is empty, query was non-ambigous
const isAmbiguous = ($) => Array.from($('#disambigbox')).length > 0
// API handles fuzzy search queries
const sanitize = (query) => wikiApi(query, page => page.data.query.search[0].title)

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

// rank by occurrence count in surrounding html
const rank = (relations, html) =>
    relations.sort((a, b) => occurrences(html, b) - occurrences(html, a))
        .slice(0, 8)

const relations = ($) => grabLinks($, 'p')
const disambiguate = ($) => grabLinks($, '#content ul').slice(0, 8)

// finds atags in a given context
const grabLinks = ($, context) => {
    const links = new Set()
    $(context).find('a').map((_, atag) => {
        if (atag.attribs.title)
            links.add(atag.attribs.title)
    })
    return Array.from(links)
}

// slices results down to top 8
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
