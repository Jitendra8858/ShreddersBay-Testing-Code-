var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");
var db = require("../models/users.model");
var User = db.user;

verifyToken = function (req, res, next) {
  token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = function (req, res, next) {
  User.findById(req.userId).then(function (user) {
    user.getRoles().then( function (roles) {
      for (i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isDealer = function (req, res, next) {
  User.findById(req.userId).then(function (user) {
    user.getRoles().then(function (roles) {
      for (i = 0; i < roles.length; i++) {
        if (roles[i].name === "dealer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Dealer Role!"
      });
    });
  });
};

isCustomer = function (req, res, next) {
  User.findById(req.userId).then(function (user) {
    user.getRoles().then(function (roles) {
      for (i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDealer: isDealer,
  isCustomer: isCustomer
};
module.exports = authJwt;
