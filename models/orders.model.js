var sql = require("./db.js");
var Order = function(data) {

  this.user_id = data.userId;
  this.prod_id = data.prodId;
  this.total_weight = data.weight;
  this.approx_price = data.approxPrice;
  this.booking_date = data.bookingDate;
  this.schedule_date = data.scheduleDate;

};

Order.create = (orderDetails, result) => {
  sql.query("INSERT INTO orders SET ?", orderDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Insert Ordered Item: ", { id: res.insertId, ...orderDetails });
    result(null, { id: res.insertId, ...orderDetails });
  });
};

//get all order item by user id
Order.getOrders = (userId, result) => {
  sql.query(`SELECT * FROM orders as o LEFT JOIN products as p on p.p_id = o.prod_id LEFT JOIN users as u on u.id=o.user_id WHERE o.user_id = ${userId} and o.status = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found orders: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


//get  order item by user id
Order.getOrdersById = (userId, result) => {
  sql.query(`SELECT * FROM orders as o LEFT JOIN products as p on p.p_id = o.prod_id LEFT JOIN users as u on u.id=o.user_id WHERE o.booking_id = ${userId} and o.status = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};



Order.cancelBooking = (id, status, result) => {
  sql.query(
    "UPDATE orders SET status = ? WHERE booking_id = ?",
    [status.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    }
  );
};

//get all order item by user id
Order.getCancelOrders = (userId, result) => {
  sql.query(`SELECT * FROM orders as o LEFT JOIN products as p on p.p_id = o.prod_id LEFT JOIN users as u on u.id=o.user_id WHERE o.user_id = ${userId} and o.status = 0`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//get all order item by user id
Order.getAllOrders = (result) => {
  sql.query(`SELECT * FROM orders as o LEFT JOIN products as p on p.p_id = o.prod_id LEFT JOIN users as u on u.id=o.user_id WHERE o.status = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = Order;
