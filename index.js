const mysql = require('mysql');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Password@_2362',
    database:'newsdb'
})

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.get('/', (req, res) => {
    connection.query("call create_tables()", (err, results) =>{
        if (err) {
            res.send(err);
        }
        else{
            res.send("datos introducidos");
        }
    });
});


app.post('/News/Add',(req, res) => {
    const{news_title, news_description, news_url, news_urlToImage, news_content} = req.query;

    connection.query("call insert news(?,?,?,?,?)", [news_title, news_description, news_url, news_urlToImage, news_content], (err, results) => {
        if (err) {
            return res.send(err);
            
        } else{
            return res.json({
                data: results
            })
        }
    } )
} )

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
    const{ userid ,email, password, idUserArticle  } = req.query;
    connection.query("Call insert_user(?,?,?,?)", [ userid, email, password, idUserArticle], (err, results) =>{
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