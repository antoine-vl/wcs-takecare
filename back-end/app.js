const express  =  require('express');
const bodyParser  =  require('body-parser');
const app  =  express();
const connection = require('./config');
const cors = require('cors');

const port = process.env.PORT  ||  5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());



app.get("/pharmacist", (req,res) => {
    console.log('GET pharmacist');
    connection.query('SELECT * FROM Orders', (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            res.json(results);
          }
    });
})




app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( port, function(){
    console.log('Listening on port '  +  server.address().port);
});