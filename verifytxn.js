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
        const firstTransaction = response.data.result[0]; 

        // Extracting txreceipt_status from the first transaction
        const txReceiptStatus = firstTransaction ? firstTransaction.txreceipt_status : null;

        res.json({ txReceiptStatus });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
