const express = require('express');
const mssql = require('mssql');

const app = express();

const config = {
    user: 'sa',
    password: 'Password@_2362',
    server:'localhost\\MSSQLSERVER',
    database: 'Northwind'
}

app.get('/', function (req, res){
    mssql.connect(config, function (error) {
        if(error) console.log(error);
       

        var request = new mssql.Request();

        request.query("SELECT * FROM Customers", function(err, recordset){
            if (err) console.log(err);
            res.send(JSON.stringify(recordset));
        })
    });

    mssql.close();

})

app.listen(5000, () => {
    console.log('Server running on port 5000...')
})