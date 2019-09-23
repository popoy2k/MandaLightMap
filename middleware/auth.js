const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/User");
passport.use(
  "Local.signup",
  new LocalStrat(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      try {
        if (!email || (!password || password !== req.body.rePassword)) {
          return cb(null, { status: "error", msg: "Please fill all fields." });
        }

        User.findOne({ "acctInfo.email": email }, (err, resData) => {
          if (err) {
            return cb(null, err);
          }

          if (resData) {
            return cb(null, { status: "error", msg: "Email already exist." });
          }

          delete req.body.rePassword;
          const { firstName, lastName, email, password } = req.body;
          const newUser = new User({
            acctInfo: { firstName, lastName, email, password }
          });
          newUser.save(err => {
            if (err) return cb(null, err);

            cb(null, { status: "success", msg: email });
          });
        });
      } catch (error) {
        cb(null, error);
      }
    }
  )
);

passport.use(
  "Local.signin",
  new LocalStrat(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      console.log(req.body, email, password);
      if (!email || !password) {
        return done(true, { status: "error", msg: "Please fill all fields." });
      }

      User.findOne({ "acctInfo.email": email }, (err, resData) => {
        if (err) {
          return done(true, err);
        }

        resData
          .comparePass(password)
          .then(isMatch => {
            if (!isMatch) {
              return done(true, {
                status: "error",
                msg: "Email/Password is incorrect."
              });
            }
            console.log("pasok na pasok");
            done(false, { status: "success", data: resData });
          })
          .catch(error => {
            return done(true, error);
          });
      });
    }
  )
);
