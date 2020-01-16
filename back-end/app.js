const express  =  require('express');
const bodyParser  =  require('body-parser');
const app  =  express();
const connection = require('./config');
const cors = require('cors');

const port = process.env.PORT  ||  5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());



app.get('/dashboard/orders', (req,res) => {
    console.log('GET pharmacist');
    connection.query("SELECT od.order_number AS 'Numéro de commande', us.firstname AS 'Prénom', us.lastname AS 'Nom', DATE(ohs.date_status) AS 'Date de création', st.name AS 'Status' FROM Users AS us JOIN Orders AS od ON od.client_id=us.id JOIN Orders_has_Status AS ohs ON ohs.orders_order_number = od.order_number JOIN Status AS st ON st.id=ohs.status_id", (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            console.log('RESULT: ', results);
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