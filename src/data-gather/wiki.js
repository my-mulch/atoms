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

            const res =  { name: keyword, children: first_p_links($, HTML).concat(all_links($, HTML)).slice(0, 8) };
            return res
        })
}

function first_p_links($, HTML) {
    const links = new Set();
    $('p').first().find('a').each((i, n) => {
        links.add(n.attribs.href);
    });

    return create_arr_objs(links, HTML);
}

function all_links($, HTML) {
    const links = new Set();
    $('p').find('a').each((i, n) => {
        links.add(n.attribs.href);
    });

    return create_arr_objs(links, HTML);
}

function create_arr_objs(link_set, HTML) {

    return Array.from(link_set).map(link => {
        const name = link.slice(6).replace(/_/g, ' ');
        return {name, link}
    })
    .map(function (link_object) {
            const matches = HTML.match(new RegExp(link_object.name, 'g'));
            return {
                name: link_object.name,
                numOccur: matches ? matches.length : 0,
                link: link_object.link
            }
        })
    .sort((a, b) => b.numOccur - a.numOccur)
    .filter(sorted_arr_obj => sorted_arr_obj.link.includes('#cite') === false);
}



module.exports = links