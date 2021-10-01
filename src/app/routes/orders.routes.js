module.exports = app => {
  const order = require("../controllers/orders.controller");
    // Create a new Cart Item
    app.post("/createOrder", order.create);

    // Retrieve all Order Items with UserId
    app.get("/getOrders/:userId", order.getOrders);
}
