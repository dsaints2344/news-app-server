const express = require('express');
const mssql = require('msql');

const app = express();

app.listen(5000, () => {
    console.log('Server running on port 5000...')
})