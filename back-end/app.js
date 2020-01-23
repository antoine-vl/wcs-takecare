const express  =  require('express');
const bodyParser  =  require('body-parser');
const app  =  express();
const connection = require('./config');
const cors = require('cors');
const orderSql = require("./commandRequest.js");

const port = process.env.PORT  ||  5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());

/*
exemple:
http://localhost:5000/dashboard/orders/?limit=10&offset=5&orderby=name&order=asc

test:
http://localhost:5000/dashboard/orders/?limit=2&offset=0&orderby=name&order=asc
let sqlQuerry = `${orderSql.GET} ORDER BY ${req.query.orderby} ${req.query.order}`;
*/

app.get('/dashboard/orders', (req,res) => {

    console.log('REQ QUERY :', req.query)
    console.log('orderby :', req.query.orderby)
    console.log('order :', req.query.order)

    let sqlQuerry = orderSql.GET

    if(req.query.order){
       sqlQuerry += ` ORDER BY ${req.query.orderby} ${req.query.order}`;
    }
    console.log('SQL QUERY :', sqlQuerry)





    /*

    let sqlQuerry = orderSql.GET + ' ORDER BY ? ?';

    const queryValue = [
      String(req.query.orderby),
      req.query.order
      /*Number(req.query.limit),
      Number(req.query.offset)
    ]

    console.log('ESCAPE :', connection.escape(req.query.orderby))

    */

    connection.query(sqlQuerry, (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            console.log('RESULT: ', results);
            res.json(results);
          }
    });
})

app.get('/dashboard/orders/:id', (req, res) => {
  const sql = `
  SELECT 
    Orders.order_number AS 'Numéro de commande', 
    Users.lastname AS 'Nom client',
    Users.firstname AS 'Prénom client',
    Users.mail AS 'Email client', 
    Users.GSM, 
    Adress.adress AS 'Adresse client',
    Adress.street_number AS 'Numéro client', 
    Adress.zip_code AS 'Code postal client', 
    Adress.city AS 'Ville client',
    pharmacist.lastname AS 'Nom pharmacien', 
    pharmacist.firstname AS 'Prénom pharmacien',
    pharmacist.mail AS 'Email pharmacien', 
    pharmacist.GSM AS 'GSM pharmacien', 
    pharmacist.pharmacy_name AS 'Nom de la pharmacie',
    primAdPharma.adress AS 'Adresse pharmacie', 
    primAdPharma.street_number AS 'Numéro pharmacie',
    primAdPharma.zip_code AS 'Code postal du pharmacien',
    primAdPharma.city AS 'Ville pharmacie',
    Orders.delivery_comment AS 'Commentaire de livraison'
  FROM Orders
	  JOIN Users ON Users.id = Orders.client_id
    JOIN Adress ON Adress.id = Users.primary_adress_id
    JOIN Users AS pharmacist ON pharmacist.id = Orders.pharmacist_id
    JOIN Adress AS primAdPharma ON primAdPharma.id = pharmacist.id   
  WHERE Orders.order_number = ?
  `

  const orderID = req.params.id
  console.log(orderID)

  connection.query(sql, orderID, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err)
      res.status(500).send('Erreur lors de la récupération des commandes');
    }
    if (results.length === 0) {
      return res.status(404).send('Order not found');
    }
    // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
    return res.json(results);
  });
});


app.get('/dashboard/clients', (req,res) => {

    console.log('GET Clients');
})




app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( port, function(){
    console.log('Listening on port '  +  server.address().port);
});