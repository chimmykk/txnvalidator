const express = require('express');
const { chromium } = require('playwright');
const fetch = require('cross-fetch'); // Use cross-fetch for server-side fetching

const app = express();
const port = 3500;

let browserInstance = null;

app.use(express.json());

app.get('/validatetxn/:txnhash', async (req, res) => {
    const { txnhash } = req.params;

    const transactionUrl = `https://taikoscan.io/tx/${txnhash}`;
    
    try {
        if (!browserInstance) {
            browserInstance = await chromium.launch();
        }
        const context = await browserInstance.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        });
        const page = await context.newPage();
        
        await page.goto(transactionUrl);

        // Wait for the page to load completely
        await page.waitForLoadState();
        
        const value = await page.$eval('.col.col-md-9 .badge.bg-success', element => {
            // Ensure the element exists and extract its text content
            if (element) {
                return element.textContent.trim();
            }
            throw new Error('Element not found');
        });

        console.log('Extracted value:', value);

        // Respond with the extracted value
        res.json({ value });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Validation failed' });

    } finally {
        if (browserInstance) {
            await browserInstance.close();
            browserInstance = null; // Reset browser instance
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
