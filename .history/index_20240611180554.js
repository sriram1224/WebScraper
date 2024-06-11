const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch';

axios.get(url).then((res) => {
    const $ = cheerio.load(res.data);
    const jobs = [];
    const elements = $('.srp-jobtuple-wrapper');
    
    elements.each((index, element) => {  // Changed '_' to 'index'
        const ele = $(element);
        
        // Adjusted the selector to find the job title
        const title = ele.find('.title').text();  // Ensure the correct selector
        console.log(title);
        
        jobs.push({ title });  // Collect the job titles into an array for further use
    });

    console.log(jobs);  // Optionally print the collected job titles
}).catch((err) => {
    console.error(err);
});
