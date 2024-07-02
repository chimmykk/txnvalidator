const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'none';
const taikoscanUrl = 'https://api.taikoscan.io/api';

app.get('/validatetxn/:address/:txhash', async (req, res) => {
  const { address, txhash } = req.params;

  try {
    const url = `${taikoscanUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txhash}&apikey=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "1") {
      res.status(200).json({ status: 'success', message: 'Transaction was successful' });
    } else {
      res.status(200).json({ status: 'failed', message: 'Transaction failed or is pending' });
    }
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch transaction status' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
