const axios = require("axios")
const cheerio = require("cheerio")

function sanitizeQuery(query) {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&_=1502826454683`)
        .then(wbpage => wbpage.data)
        .then(data => {
            // console.log(data.query.search[0].title);
            return data.query.search[0].title
        })
}

function links(keyword) {

    if (keyword.includes(' ')) {
        keyword = keyword.split(' ').join('+');
    }

    const query = sanitizeQuery(keyword)

    return query.then(text => {
        return axios.get(`https://en.wikipedia.org/wiki/${text}`)
        .then(wbpage => {

            let HTML = wbpage.data;
            const $ = cheerio.load(HTML);

            const name = text
            // let children = Array.from(first_p_links($, HTML).concat(all_links($, HTML)).slice(0, 8));
            let children = all_links($, HTML).slice(0, 8);

            let res = {
                name: name,
                children: children
            }

            if (res.children.length < 8) res = {
                name: name,
                children: disambiguate($, HTML).slice(0, 8)
            };

            // console.log(res)

            return res;
        })

    })
}

function first_p_links($, HTML) {
    const links = new Set();
    $('p').first().find('a').each((i, n) => {
        if (n.attribs.href) links.add(n.attribs.href);
    });

    return formatFilter(links, HTML);
}

function all_links($, HTML) {
    const links = new Set();
    $('p').find('a').each((i, n) => {
        if (n.attribs.href) links.add(n.attribs.href);
    });

    return formatFilter(links, HTML);
}


function disambiguate($, HTML) {

    const links = new Set();
    $('ul').find('a').each((i, n) => {
        if (n.attribs.href) links.add(n.attribs.href);
    });

    return formatFilter(links, HTML, 'disambiguation');
}

function formatFilter(link_set, HTML, type) {
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

module.exports = links;
