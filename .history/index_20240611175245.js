const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch ';
axios.get(url).then((res) = {

    console.log(res.data)
});