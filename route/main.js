const router = require("express").Router();
const passport = require("passport");

router.route("/signup").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.signup",
      { session: false },
      (err, msg, info) => {
        if (msg.status === "error") {
          res.status(400).json(msg);
          return next(err);
        }
        res.status(200).json(msg);
        next();
      }
    )(req, res, next);
  },
  (req, res) => {
    // to be handled
  }
);

router.route("/signin").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.signin",
      { session: false },
      (err, msg, info) => {
        console.log(err, msg);
        if (err) {
          res.status(400).json(msg);
          return next();
        }
        res.status(200).json(msg);
        next();
      }
    )(req, res, next);
  },
  (req, res) => {
    // to be handled
  }
);

router.route("/user/activation").post(function(req, res, next) {
  passport.authenticate(
    "Local.activated",
    { session: false },
    (err, msg, info) => {
      console.log(err, msg, info);
      next();
    }
  ),
    (req, res) => {
      console.log("tangina");
    };
});
module.exports = router;
