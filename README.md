# Naukri IT Jobs Scraper

This project is a web scraper built using Node.js, Puppeteer, and xlsx that extracts job listings from the Naukri IT jobs page and saves them into an Excel file.

## Features

- Scrapes job titles, company names, and locations from Naukri IT jobs page.
- Handles dynamically loaded content using Puppeteer.
- Saves the extracted data to an Excel file.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 10 or later)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/naukri-it-jobs-scraper.git
    cd naukri-it-jobs-scraper
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Run the scraper:
    ```sh
    node index.js
    ```

2. The scraped data will be saved to `Naukri_IT_Jobs.xlsx` in the project directory.

## Code Explanation

### `index.js`

```javascript
const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
    const url = "https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch";

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });

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

        console.log(`Number of jobs found: ${data.length - 1}`); 
        console.log(data); 

        const worksheet = xlsx.utils.aoa_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Jobs');
        xlsx.writeFile(workbook, 'Naukri_IT_Jobs.xlsx');

        await browser.close();
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();
