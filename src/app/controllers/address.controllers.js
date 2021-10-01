var Address = require("../../../models/address.model");
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Address
  const address = new Address({
    u_id: req.body.uId,
    address: req.body.address,
    city: req.body.city,
    district: req.body.district,
    state: req.body.state,
    pin_code: req.body.pinCode,
  });
  // Save Address in the database
  Address.create(address, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address."
      });
    else res.send(data);
  });
};

// Retrieve all Address from the database.
exports.findAddress = (req, res) => {
  Address.getAddress((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Address."
      });
    else res.send(data);
  });
};



// Activate a Address identified by the userId in the request
exports.activeAddress = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Address.activeAddress(
    req.params.userId,
    new Address(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Address with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};
