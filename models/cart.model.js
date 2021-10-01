var sql = require("./db.js");
var Cart = function(data) {

  this.user_id = data.userId;
  this.prod_id = data.prodId;
  this.total_weight = data.weight;
  this.total_price = data.totalPrice;
  this.file = data.file;
};

Cart.create = (cartDetails, result) => {
  sql.query("INSERT INTO cart SET ?", cartDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Insert Cart Item: ", { id: res.insertId, ...cartDetails });
    result(null, { id: res.insertId, ...cartDetails });
  });
};

//get all cart item by user id
Cart.getCartById = (userId, result) => {
  sql.query(`SELECT * FROM cart as c left join products as p on c.prod_id = p.p_id WHERE c.user_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cart items: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Cart.remove = (id, result) => {
  sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Cart Item with id: ", id);
    result(null, res);
  });
};


module.exports = Cart;
