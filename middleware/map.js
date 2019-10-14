const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const MandaLipo = require("../model/MandaLipo");

passport.use(
  "Local.custom_map_data",
  new LocalStrat(
    {
      usernameField: "mapObj",
      passwordField: "mapObj",
      passReqToCallback: true
    },
    (req, user, pass, done) => {
      if (!user || !pass || !req.body.mapObj) {
        return done(null, { status: "error", msg: "Invalid parameter." });
      }

      let year = [...user];

      if (user.indexOf(",")) {
        year = user.split(",").map(val => val.split("-")[0]);
      }
      // Use this if you decided to lazy load lipo data
      // =============================
      //   MandaLipo.find({ year: { $in: year } }, (err, fetData) => {
      //     if (err) {
      //       return done(null, { status: "error", msg: "Something went wrong" });
      //     }

      //     if (!fetData) {
      //       return done(null, { status: "error", msg: "Invalid output" });
      //     }

      //     return done(null, { status: "success", data: fetData });
      //   });

      MandaLipo.find().exec((err, fetData) => {
        if (err) {
          return done(null, { status: "error", msg: "Something went wrong" });
        }

        if (!fetData) {
          return done(null, { status: "error", msg: "Invalid output" });
        }

        return done(null, { status: "success", data: fetData });
      });
    }
  )
);
