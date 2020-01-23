const express  =  require('express');
const bodyParser  =  require('body-parser');
const app  =  express();
const connection = require('./config');
const cors = require('cors');

const port = process.env.PORT  ||  5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());

/*
exemple:
http://localhost:5000/dashboard/orders/?limit=10&offset=5&orderby=name&order=asc

test:
http://localhost:5000/dashboard/orders/?orderby=name&order=asc&limit=2&offset=0&
let sqlQuerry = `${orderSql.GET} ORDER BY ${req.query.orderby} ${req.query.order}`;
*/

app.get('/dashboard/orders', (req,res) => {

    console.log('REQ QUERY :', req.query)
    console.log('orderby :', req.query.orderby)
    console.log('order :', req.query.order)
    let sqlQuerry = `
      SELECT od.order_number, 
      us.firstname, 
      us.lastname, 
      ohs.date_status, 
      st.name     
      FROM Users AS us 
      JOIN Orders AS od ON od.client_id=us.id
      JOIN Orders_has_Status AS ohs ON ohs.orders_order_number = od.order_number
      JOIN Status AS st ON st.id=ohs.status_id`;
    

    if(req.query.order){
       sqlQuerry += ` 
        ORDER BY ${req.query.orderby} ${req.query.order} 
        LIMIT ${req.query.limit} 
        OFFSET ${req.query.offset}`;
    }

    console.log('SQL QUERY :', sqlQuerry)

    connection.query(sqlQuerry, (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            console.log('RESULT: ', results);
            res.json(results);
          }
    });
})






app.get('/dashboard/orders/count', (req,res) => {

  let sqlQuerry = `
    SELECT count(*) AS cpt
    FROM Orders`;

  connection.query(sqlQuerry, (err, results) => {
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