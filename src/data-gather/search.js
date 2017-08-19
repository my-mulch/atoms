const axios = require('axios')
const jquery = require('jquery')
const { JSDOM } = require('jsdom')

// text indicating an ambiguous query. If our array is empty we are clear.
const AMBIGUOUS = 'in Wiktionary, the free dictionary'
function isAmbiguous($) {
    return Array.from($(`#content:contains(${AMBIGUOUS})`)).length > 0
}

function sanitize(query) {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&_=1502826454683`)
        // API handles fuzzy search
        .then(page => page.data.query.search[0].title)
}

function findRelations($) {
    return Array.from($('#content a[href*="/wiki"]'))
        .map(atag => atag.title)
}

function disambiguate($) {
    return Array.from($('#content li a'))
        .filter(atag => !atag.href.includes('#'))
        .map(link => link.title)
}

function occurrences(text, target) {
    return target.length
        ? text.split(target).length - 1
        : 0
}

function rank(html, relations) {
    return Array.from(new Set(relations))
        .map(relation => ({ occurs: occurrences(html, relation), relation }))
        .sort((a, b) => b.occurs - a.occurs)
}

function relate(query) {

    sanitize(query.replace(' ', '+'))
        .then(article =>
            axios.get(`https://en.wikipedia.org/wiki/${article}`)
                // cheerio allows for JQuery methods on the backend
                // here we simply load the entire html page onto a virtual dom
                .then(res => {
                    const html = res.data
                    const $ = jquery(new JSDOM(html).window)
                    const relations = isAmbiguous($)
                        // show possible matches to user
                        ? disambiguate($)
                        // select only links to other wiki pages
                        : findRelations($)

                    return { html, relations }
                }))

        .then(({ html, relations }) => console.log(rank(html, relations)))

}

relate('superman')

module.exports = relate;
