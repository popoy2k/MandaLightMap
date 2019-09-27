const router = require("express").Router();
const passport = require("passport");
const customActivate = require("../middleware/custom");

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
        if (msg.status === "error") {
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

router.route("/user/activation/:token").get(customActivate, (req, res) => {
  // to be handled
});

router.route("/user/forget/request").post((req, res) => {});

module.exports = router;
