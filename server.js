const express = require('express');
const cors = require('cors');
const app = express();
const port = 3400;


app.use(cors());


app.get('/validatetxn/:txnhash', (req, res) => {
    const { txnhash } = req.params;

    const transactionUrl = `https://taikoscan.io/tx/${txnhash}`;
    res.json({ transactionUrl });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
