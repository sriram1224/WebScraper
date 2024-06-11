const { get } = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch ';
get(url).then((res) = {

    console.log(res.data)
});