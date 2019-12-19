const  mysql = require('mysql');
const  connection = mysql.createConnection({
    host :  'localhost', 
    user :  'root',
    password :  '5cµ6Qm[Q6f',
    database :  'take_care_db',
});

module.exports = connection;