module.exports = app => {
const cart = require("../controllers/cart.controller");
  // Create a new Cart Item
  app.post("/createCart", cart.create);

  // Retrieve all Cart Items with UserId
 app.get("/getCartById/:userId", cart.getCartById);

   // Delete a Item with Id
   app.delete("/removeItem/:Id", cart.delete);
}
