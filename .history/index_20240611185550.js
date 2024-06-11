const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url, retries = 3) => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    };

    while (retries > 0) {
        try {
            const res = await axios.get(url, { headers });
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                retries -= 1;
                console.error(`Request failed with status code 500. Retries left: ${retries}`);
                await sleep(2000); // Wait for 2 seconds before retrying
            } else {
                throw error;
            }
        }
    }

    throw new Error('Failed to fetch data after multiple attempts');
};

(async () => {
    const url = "https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch";
    try {
        const html = await fetchData(url);

        const $ = cheerio.load(html);
        const data = [];
        data.push(['Job Title', 'Company Name', 'Location']);

        const joblist = $('.styles_jlc__main__VdwtF'); // Update the selector to match job containers
        console.log(`Number of jobs found: ${joblist.length}`); // Log the number of jobs found

        joblist.each((_, element) => {
            const jobTitle = $(element).find('.title.fw500.ellipsis').text().trim();
            const companyName = $(element).find('.subTitle.ellipsis.fleft').text().trim();
            const location = $(element).find('.fleft.grey-text.br2.placeHolderLi.location').text().trim();
            
            data.push([jobTitle, companyName, location]);
        });

        // Log the collected data
        console.log(data);

        // Optionally save data to an Excel file
        const worksheet = xlsx.utils.aoa_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Jobs');
        xlsx.writeFile(workbook, 'Naukri_IT_Jobs.xlsx');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();


