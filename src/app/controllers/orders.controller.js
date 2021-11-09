var Order = require("../../../models/orders.model");

//create Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
// Create a Order
const order = new Order({
  userId: req.body.userId,
  prodId: req.body.prodId,
  weight: req.body.weight,
  totalPrice: req.body.totalPrices,
  approxPrice: req.body.approxPrice,
  bookingDate: req.body.bookingDate,
  scheduleDate: req.body.scheduleDate,
});
// Save order Detail in the database
Order.create(order, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Order."
    });
  else res.send(data);
});
};

// Find  orders data with a userId
exports.getOrders = (req, res) => {
  Order.getOrders(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order Item with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order Item with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find  orders data with a userId
exports.getOrdersById = (req, res) => {
  Order.getOrdersById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order Item with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order Item with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find  orders data with a userId
exports.getCancelOrders = (req, res) => {
  Order.getCancelOrders(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order Item with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order Item with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find  orders data with a userId
exports.getAllOrders = (req, res) => {
  Order.getAllOrders((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order Item}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order Item with id "
        });
      }
    } else res.send(data);
  });
};

// Update a Order identified by the userId in the request
exports.cancelBooking = (req, res) => {
  // Validate Request
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Order.cancelBooking(
    req.params.userId,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};
