const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch';

axios.get(url).then((res) => {
    const $ = cheerio.load(res.data);
    const jobs = [];
    const elements = $('.styles_jlc__main__VdwtF');
    
    // elements.each((index, element) => {  
    //     const ele = $(element);
        
       
    //     const title = ele.find('.title').text();  
    //     console.log(title);
        
    //     jobs.push({ title }); 
    // });

    console.log(res.data);  // Optionally print the collected job titles
}).catch((err) => {
    console.error(err);
});
