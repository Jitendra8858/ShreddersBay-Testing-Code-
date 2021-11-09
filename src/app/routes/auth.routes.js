 User = require("../controllers/auth.controller");
module.exports = function(app) {
  app.post("/users/signin", User.signin);
}
