const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '#REPLACE IT'; 
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

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction status' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
