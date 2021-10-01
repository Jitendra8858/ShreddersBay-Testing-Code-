var sql = require("./db.js");

// constructor
var Address = function(address) {
  this.u_id = address.u_id;
  this.address = address.address;
  this.city = address.city;
  this.district = address.district;
  this.state = address.state;
  this.pin_code = address.pin_code;
};

Address.create =(newAdd, result) => {
  sql.query("INSERT INTO address SET ?", newAdd, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Address: ", { id: res.insertId, ...newAdd });
    result(null, { id: res.insertId, ...newAdd });
  });
};

Address.getAddress = (result) => {
  sql.query("SELECT * FROM address", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Address: ", res);
    result(null, res);
  });
};


Address.activeAddress = (id, status, result) => {
  sql.query(`UPDATE address SET status = ${status}  WHERE id = ${id}`,
    (err, res) => {
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

      console.log("updated address: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = Address;
