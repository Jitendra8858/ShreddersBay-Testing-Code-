var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
app.use(cors());
app.options('*', cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to shreddersbay application." });
});

require('./src/app/routes/auth.routes')(app);
require("./src/app/routes/user.routes")(app);
require("./src/app/routes/cart.routes")(app);
require("./src/app/routes/orders.routes")(app);
// set port, listen for requests
//localhost:3000/users
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
