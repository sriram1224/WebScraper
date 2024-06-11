const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
};

axios.get(url, { headers }).then((res) => {
    const $ = cheerio.load(res.data);
    const jobs = [];
    const elements = $('#listContainer .jobTuple');
    console.log(elements.length);
    elements.each((index, element) => {  
        const ele = $(element);
        const title = ele.find('.title').text();  
    
        jobs.push({ title }); 
    });

    
}).catch((err) => {
    console.error(err);
});
