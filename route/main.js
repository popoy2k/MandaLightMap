const router = require("express").Router();
const passport = require("passport");
const { customActivate, verifyToken } = require("../middleware/custom");
router.route("/signup").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.signup",
      { session: false },
      (err, msg, info) => {
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

router.route("/user/forget/request").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.request_reset",
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

router.route("/user/reset/").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.pass_reset",
      { session: false },
      (err, msg, info) => {
        if (msg.status === "error") {
          res.status(400).json(msg);
          return next();
        }
        res.status(200).json(msg);
        return next();
      }
    )(req, res, next);
  },
  (req, res) => {
    // to be handled
  }
);

router.route("/google/signin").post(
  function(req, res, next) {
    passport.authenticate(
      "Local.google_signin",
      { session: false },
      (err, msg, info) => {
        if (msg.status === "error") {
          res.status(400).json(msg);
          return next();
        }
        res.status(200).json(msg);
        return next("router");
      }
    )(req, res, next);
  },
  (req, res) => {
    // to be handled
  }
);

router.route("/verify/token").post(verifyToken, (req, res) => {
  // To be handled
});

module.exports = router;
