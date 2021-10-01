var sql = require("./db.js");

// constructor
var Admin = function(user) {

  this.name = user.name;
};


Admin.getCountries = (result) => {
  sql.query("SELECT * FROM `countries`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("countries: ", res);
    result(null, res);
  });
};
Admin.findById = (userId, result) => {
  sql.query(`SELECT * FROM countries WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.findByEmail = (userEmail, result) => {
  sql.query(`SELECT * FROM countries WHERE email = '${userEmail}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


Admin.updateById = (id, user, result) => {
  sql.query(
    "UPDATE countries SET name = ? WHERE id = ?",
    [user.name, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Admin.status = (id, status, result) => {
  sql.query(
    `UPDATE countries SET status = ${status} WHERE id = ${id}`,
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


Admin.create = (newUser, result) => {
  sql.query("INSERT INTO countries SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Country: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};



Admin.remove = (id, result) => {
  sql.query("DELETE FROM countries WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Admin.removeAll = result => {
  sql.query("DELETE FROM countries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};


Admin.getState = (result) => {
  sql.query("SELECT * FROM `states`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("states: ", res);
    result(null, res);
  });
};

Admin.findStateId = (userId, result) => {
  sql.query(`SELECT * FROM states WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.updateStateId = (id, user, result) => {
  sql.query(
    "UPDATE states SET name = ? WHERE id = ?",
    [user.name, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Admin.stateStatus = (id, status, result) => {
  sql.query(
    `UPDATE states SET status = ${status} WHERE id = ${id}`,
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

      console.log("updated State: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


Admin.createState = (newUser, result) => {
  sql.query("INSERT INTO states SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created State: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};



Admin.removeState = (id, result) => {
  sql.query("DELETE FROM states WHERE id = ?", id, (err, res) => {
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

    console.log("deleted state with id: ", id);
    result(null, res);
  });
};

Admin.removeAllStates = result => {
  sql.query("DELETE FROM states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};


module.exports = Admin;
