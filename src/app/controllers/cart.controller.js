var Cart = require("../../../models/cart.model");

//create cart item
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
// Create a Create Cart
const cart = new Cart({
  userId: req.body.userId,
  prodId: req.body.prodId,
  weight: req.body.weight,
  totalPrice: req.body.totalPrice,
  file: req.body.file,
});
// Save Cart Item in the database
Cart.create(cart, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Cart Item."
    });
  else res.send(data);
});
};


// Find a single User with a userId
exports.getCartById = (req, res) => {
  Cart.getCartById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cart Item with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cart Item with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Delete a Cart Item with the specified Id in the request
exports.delete = (req, res) => {
  Cart.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Item with id " + req.params.Id
        });
      }
    } else res.send({ message: `Item was deleted successfully!` });
  });
};
