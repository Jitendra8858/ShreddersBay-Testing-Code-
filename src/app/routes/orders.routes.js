module.exports = app => {
  const order = require("../controllers/orders.controller");
    // Create a new Cart Item
    app.post("/createOrder", order.create);

    // Retrieve all Order Items with UserId
    app.get("/getOrders/:userId", order.getOrders);

     // Retrieve  Order Items with UserId
  app.get("/getOrdersById/:userId", order.getOrdersById);

  // Update a Order with customerId
  app.put("/cancelBooking/:userId", order.cancelBooking);

  // Update a Order with customerId
  app.get("/getCancelOrders/:userId", order.getCancelOrders);

  // Update a Order with customerId
  app.get("/getAllOrders", order.getAllOrders);


}
