module.exports = app => {
  const address = require("../controllers/address.controllers");

  // Create a new Address
  app.post("/address", address.create);

  // Retrieve all Address
  app.get("/getAddress", address.findAddress);

  // Active Address
  app.put("/activeAddress/:userId", address.activeAddress);
}
