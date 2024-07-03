const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '#replace it'; // Replace with your Taikoscan API key

app.get('/checktxn/:txnhash', async (req, res) => {
  const { txnhash } = req.params;

  try {
    const response = await axios.get('https://api.taikoscan.io/api', {
      params: {
        module: 'transaction',
        action: 'gettxreceiptstatus',
        txhash: txnhash,
        apikey: API_KEY,
      },
    });

    const resultStatus = response.data.result.status;

    if (resultStatus === '0') {
      res.status(200).json({ status: 'failed' });
    } else if (resultStatus === '1') {
      res.status(200).json({ status: 'success' });
    } else {
      res.status(200).json({ status: 'unknown' }); 
    }
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    res.status(500).json({ error: 'Failed to fetch transaction status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
