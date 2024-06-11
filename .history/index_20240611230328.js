const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
    const url = "https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch";

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the job listings to load
        await page.waitForSelector('.cust-job-tuple.layout-wrapper');

        const data = await page.evaluate(() => {
            const rows = [];
            rows.push(['Job Title', 'Company Name', 'Location']);

            const jobElements = document.querySelectorAll('.cust-job-tuple.layout-wrapper');
            jobElements.forEach(element => {
                const jobTitle = element.querySelector('.title') ? element.querySelector('.title').innerText.trim() : '';
                const companyName = element.querySelector('.comp-name') ? element.querySelector('.comp-name').innerText.trim() : '';
                const location = element.querySelector('.locWdth') ? element.querySelector('.locWdth').innerText.trim() : '';

                if (jobTitle && companyName && location) {
                    rows.push([jobTitle, companyName, location]);
                }
            });

            return rows;
        });

        console.log(`Number of jobs found: ${data.length - 1}`); // Log the number of jobs found
        console.log(data); // Log the collected data

        // Optionally save data to an Excel file
        const worksheet = xlsx.utils.aoa_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Jobs');
        xlsx.writeFile(workbook, 'Naukri_IT_Jobs.xlsx');

        await browser.close();
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();
