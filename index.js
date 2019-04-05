const mysql = require('mysql');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Password@_2362',
    database:'world'
})

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.get('/', (req, res) => {
    connection.query("call create_table()", (err, results) =>{
        if (err) {
            res.send(err);
        }
        else(
            console.log("datos introducidos")
        )
    });
});


//API METHOD TO EXTRACT FAVORITE NEWS
app.get('/News/:email', (req, res) => {

    const {email} = req.query;
    connection.query("Call extract_news(?)", email, (err, results) =>{
        if (err) {
            return res.send(err)
        } else{
            return res.json({
                data: results
            })
        }
    });
});


//API METHOD TO ADD USER
app.post('/Users/new', (req, res) =>{
    const{email, password, idUserArticle  } = req.query;
    connection.query("Call insert_user(?,?,?)", [email, password, idUserArticle], (err, results) =>{
        if (err) {
            return res.send(err)
        } else{
            return res.json({
                data: results
            })
        }
    })
  

});

app.listen(5000, () => {
    console.log('Starting server on port 5000...');
     
})