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


    connection.query(sqlQuerry, (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            res.json(results);
          }
    });
})


app.get('/dashboard/orders/:id', (req, res) => {

  if(req.params.id === 'count'){
    let sqlQuerry = `
      SELECT count(*) AS cpt
      FROM Orders`;

    connection.query(sqlQuerry, (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            res.json(results);
          }
    });
  }
  else {
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

    connection.query(sql, orderID, (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des commandes');
      }
      if (results.length === 0) {
        return res.status(404).send('Order not found');
      }
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      return res.json(results);
    });
  }
});

app.get('/dashboard/orders/:id/pharmaceuticals', (req, res) => {

  const sql = `
  SELECT 
  ph.name, 
  ohp.quantity, 
  ph.price, 
  ph.category 
  FROM Orders AS od
  JOIN Orders_has_Pharmaceuticals AS ohp ON ohp.orders_order_number = od.order_number
  JOIN Pharmaceuticals AS ph ON ph.id_medicament = ohp.pharmaceuticals_id_medicament
  WHERE od.order_number = ?
  `

  const orderID = req.params.id

  connection.query(sql, orderID, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des commandes');
    }
    if (results.length === 0) {
      return res.status(404).send('Order not found');
    }
    return res.json(results);
  });

});

app.get('/dashboard/orders/:id/status', (req, res) => {

  const sql = `
  SELECT
  st.name AS status,
  ohs.date_status AS date_status
  FROM Orders
  JOIN Orders_has_Status AS ohs ON ohs.orders_order_number = Orders.order_number
  JOIN Status AS st ON st.id = ohs.status_id
  WHERE Orders.order_number = ?
  `

  const orderID = req.params.id

  connection.query(sql, orderID, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des commandes');
    }
    if (results.length === 0) {
      return res.status(404).send('Order not found');
    }
    return res.json(results);
  });

});



app.get('/dashboard/clients', (req,res) => {

  let sqlQuerry = `
    SELECT 
    lastname, 
    firstname, 
    GSM, 
    zip_code, 
    city,
    us.id

    FROM Users AS us

    JOIN Adress AS ad ON ad.id=us.primary_adress_id
    JOIN Roles AS ro ON ro.id=us.roles_id 
          
    WHERE ro.role = 'Client'
  `;
  

  if(req.query.order){
     sqlQuerry += ` 
      ORDER BY ${req.query.orderby} ${req.query.order} 
      LIMIT ${req.query.limit} 
      OFFSET ${req.query.offset}`;
  }


  connection.query(sqlQuerry, (err, results) => {
      if (err) {
          res.status(500).send(`Error retrieving orders! err: ${err}`);
        } else {
          res.json(results);
        }
  });
})

app.get('/dashboard/clients/:id', (req, res) => {

  if(req.params.id === 'count'){
    const sqlQuerry = `
      SELECT count(*) AS cpt
      FROM Users`;

    connection.query(sqlQuerry, (err, results) => {
        if (err) {
            res.status(500).send(`Error retrieving orders! err: ${err}`);
          } else {
            res.json(results);
          }
    });
  }
  else {
    const sql =
      `SELECT 
      lastname, 
      firstname, 
      mail, 
      GSM, 
      date_inscription, 
      national_registration_number ,
      zip_code,
      adress,
      city,
      street_number
      
      FROM Users AS us
      
      JOIN Adress AS ad ON ad.id = us.primary_adress_id
      JOIN Roles AS ro ON ro.id = us.roles_id
      
      WHERE us.primary_adress_id = ?
      AND ro.role = 'client'`

    const ClientsID = req.params.id

    
    connection.query(sql, ClientsID, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des clients');
      }
      if (results.length === 0) {
        return res.status(404).send('Clients not found');
      }
      return res.json(results);
    });
  }
});




app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( port, function(){
});