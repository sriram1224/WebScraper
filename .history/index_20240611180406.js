const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch ';
axios.get(url).then((res) => {

    const $ = cheerio.load(res.data);
    const jobs = [];
    const elements = $('.srp-jobtuple-wrapper');
    elements.each((_, element) => { 
      
        const ele = $(element);
        const titles = ele.find('title').text();
        console.log(titles);


    })
    
  

});