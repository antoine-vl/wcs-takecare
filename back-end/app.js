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


app.get('/dashboard/clients/:id', (req, res) => {
  const sql = `SELECT 
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
              WHERE us.primary_adress_id = 1`
    const ClientsID = req.params.id
  console.log(ClientsID)
  connection.query(sql, ClientsID, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l’utilisateur de l’erreur
      console.log(err)
      res.status(500).send('Erreur lors de la récupération des clients');
    }
    if (results.length === 0) {
      return res.status(404).send('Clients not found');
    }
    // Si tout s’est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
    return res.json(results);
  });
});




app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( port, function(){
    console.log('Listening on port '  +  server.address().port);
});