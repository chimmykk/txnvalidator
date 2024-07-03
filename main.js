const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/verifytxn/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const apiKey = '';
        const apiUrl = `https://api.taikoscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const transactions = response.data.result.slice(0, 5);

        const extractedData = transactions.map(tx => ({
            to: tx.to,
            txReceiptStatus: tx.txreceipt_status
        }));

        res.json({ transactions: extractedData });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
