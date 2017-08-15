const axios = require("axios")
const cheerio = require("cheerio")

function links(keyword) {

    let HTML = '';
    let keywordStr = keyword;
    if (keyword.includes(' ')) {
        keywordStr = keyword.split(' ').join('_')
    }

    return axios.get(`https://en.wikipedia.org/wiki/${keywordStr.toLowerCase()}`)
        .then(wbpage => {

            HTML = wbpage.data;
            const $ = cheerio.load(HTML);

            let res =  { name: keyword, children: first_p_links($, HTML).concat(all_links($, HTML)).slice(0, 8) };
            if (res.children.length < 8) res = { name: keyword, children: disambiguation($, HTML).slice(0, 8) };

            return res;
        })
}

function first_p_links($, HTML) {
    const links = new Set();
    $('p').first().find('a').each((i, n) => {
        links.add(n.attribs.href);
    });

    return formatFilter(links, HTML);
}

function all_links($, HTML) {
    const links = new Set();
    $('p').find('a').each((i, n) => {
        links.add(n.attribs.href);
    });

    return formatFilter(links, HTML);
}

function disambiguation ($, HTML) {

    const links = new Set();
    $('ul').find('a').each((i, n) => {
        links.add(n.attribs.href);
    });

    return formatFilter(links, HTML, 'disambiguation');
}

function formatFilter (link_set, HTML, type) {
    const arrObjs = Array.from(link_set).map(link => {
        const name = link.slice(6).replace(/_/g, ' ');
        return { name, link }
    })
        .filter(sorted_arr_obj => !(/#|:|.org|.php/g).test(sorted_arr_obj.link));

    if (type) return arrObjs;
    else return create_arr_objs(arrObjs, HTML);
}

function create_arr_objs(arrObjs, HTML) {
    return arrObjs
        .map(function (link_object) {
            const matches = HTML.match(new RegExp(link_object.name, 'g'));
            return {
                name: link_object.name,
                numOccur: matches ? matches.length : 0,
                link: link_object.link
            }
        })
        .sort((a, b) => b.numOccur - a.numOccur);
}

links('*');

module.exports = links;
