let query = '';
query += "SELECT od.order_number AS 'Numéro de commande', us.firstname AS 'Prénom', us.lastname AS 'Nom', DATE(ohs.date_status) AS 'Date de création', st.name AS 'Status' "
query += "FROM Users AS us "
query += "JOIN Orders AS od ON od.client_id=us.id "
query += "JOIN Orders_has_Status AS ohs ON ohs.orders_order_number = od.order_number "
query += "JOIN Status AS st ON st.id=ohs.status_id"

module.exports = {GET: query}