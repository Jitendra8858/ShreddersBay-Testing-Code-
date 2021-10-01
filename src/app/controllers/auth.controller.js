var User = require("../../../models/users.model");
var config = require("../../../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  User.findByEmail(req.body.email), (err, data) =>
  {
      if (err){
        if(res.status(500))
        res.status(500).send({ message: err.message });
        else
        return res.status(404).send({ message: "User Not found." });
      }
    else{
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
          res.send({
            id: data.id,
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            roles: daata.userRole,
            accessToken: token
          });
      }
  }
};