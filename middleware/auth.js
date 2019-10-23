const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/User");
const Mailer = require("../utility/Mailer");
const genRand = require("../utility/RandomBytes");
const crypto = require("crypto");

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
            return cb(null, {
              status: "error",
              msg: "Something went wrong 1."
            });
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
            if (err) {
              return cb(null, {
                status: "error",
                msg: "Something went wrong."
              });
            }

            crypto.randomBytes(128, (randErro, randBuff) => {
              if (randErro) {
                return cb(null, {
                  status: "error",
                  msg: "Something went wrong."
                });
              }

              Mailer.sender({
                from: `Skótos Authentication <${process.env.G_USER}>`,
                to: email,
                subject: "Account Verification",
                html: `Hi ${firstName} ${lastName}, 
                <br /> 
                You have successfully registered to our system, 
                and to fully activate your account please click the link. 
                You have <strong><i> 2 hours </i></strong> to activate your account.<br />
                <a href="http://localhost:3000/auth/uact/${randBuff.toString(
                  "hex"
                )}">http://localhost:3000/auth/uact/${randBuff.toString(
                  "hex"
                )}</a>`
              })
                .then(reas => {
                  newUser.acctInfo.activationInfo.activationToken = randBuff.toString(
                    "hex"
                  );
                  newUser.acctInfo.activationInfo.activationExpiry =
                    Date.now() + 2 * 60 * 60 * 1000;

                  newUser.save(lastErroNa => {
                    if (lastErroNa) {
                      cb(null, {
                        status: "error",
                        msg: "Something went wrong."
                      });
                    }

                    return cb(false, {
                      status: "success",
                      data: { email }
                    });
                  });
                })
                .catch(reas => {
                  return cb(null, {
                    status: "error",
                    msg: "Something went wrong."
                  });
                });
            });
          });
        });
      } catch (error) {
        return cb(null, {
          status: "error",
          msg: "Something went wrong."
        });
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
      if (!email || !password) {
        done(null, { status: "error", msg: "Please fill all fields." });
      }

      User.findOne(
        { "acctInfo.email": email, "acctInfo.creationType": "Local" },
        (err, resData) => {
          if (err) {
            return done(null, {
              status: "error",
              msg: "Something went wrong."
            });
          }

          resData
            .comparePass(password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, {
                  status: "error",
                  msg: "Email/Password is incorrect."
                });
              }
              const {
                firstName,
                lastName,
                email,
                creationType,
                creationId
              } = resData.acctInfo;

              return done(null, {
                status: "success",
                data: {
                  firstName,
                  lastName,
                  email,
                  creationType,
                  creationId
                }
              });
            })
            .catch(isError => {
              return done(null, {
                status: "error",
                msg: "Something went wrong."
              });
            });
        }
      );
    }
  )
);

passport.use(
  "Local.request_reset",
  new LocalStrat(
    {
      usernameField: "email",
      passwordField: "email",
      passReqToCallback: true
    },
    (req, email, pass, done) => {
      if (!email) {
        return done(null, { status: "error", msg: "Please enter email." });
      }

      User.findOne({ "acctInfo.email": email })
        .select("-acctInfo.password")
        .exec((error, result) => {
          if (error) {
            return done(null, {
              status: "error",
              msg: "Something went wrong."
            });
          }
          if (!result) {
            return done(null, {
              status: "error",
              msg: "Please enter a valid email."
            });
          }

          const {
            isActivated,
            activationExpiry
          } = result.acctInfo.activationInfo;

          if (!isActivated) {
            if (new Date(activationExpiry) > Date.now()) {
              return done(null, {
                status: "error",
                msg:
                  "Your account is not validated yet, Please activate it using the link provided sent in your email."
              });
            }
            return done(null, {
              status: "error",
              msg:
                "This account hasn't activated by the given time allotted. Please re-signup"
            });
          }

          crypto.randomBytes(128, (randErr, randBuff) => {
            if (randErr) {
              return done(null, {
                status: "error",
                msg: "Something went wrong."
              });
            }
            Mailer.sender({
              from: `Skótos Reset Password <${process.env.G_USER}>`,
              to: email,
              subject: "Account Reset Password",
              html: `You've successfully requested for your password to be reset. 
              Here's a link for you to be able to reset your password. 
              Bare in mind that after <strong><i>2 hours</i></strong> this link will expired. <br /> 
              <a href="http://localhost:3000/auth/ures/${randBuff.toString(
                "hex"
              )}">Click me </a>`
            })
              .then(res => {
                result.acctInfo.resetPass.resetToken = randBuff.toString("hex");
                result.acctInfo.resetPass.resetReqDate = Date.now();
                result.acctInfo.resetPass.resetExpiryDate =
                  Date.now() + 2 * 60 * 60 * 1000;

                result.save(err => {
                  if (err) {
                    return done(null, {
                      status: "error",
                      msg: "Something went wrong"
                    });
                  }

                  return done(null, { status: "success", data: { email } });
                });
              })
              .catch(err =>
                done(null, { status: "error", msg: "Something went wrong" })
              );
          });
        });
    }
  )
);

passport.use(
  "Local.pass_reset",
  new LocalStrat(
    {
      usernameField: "password",
      passwordField: "rePassword",
      passReqToCallback: true
    },
    (req, pass, rePass, done) => {
      const { token } = req.body;
      if (!token || !pass || !rePass || pass !== rePass) {
        return done(null, { status: "error", msg: "Please fill all fields." });
      }

      User.findOne({
        "acctInfo.resetPass.resetToken": token,
        "acctInfo.creationType": "Local"
      })
        .select("-acctInfo.password")
        .exec((err, resData) => {
          if (err) {
            return done(null, { status: "error", msg: "Something went wrong" });
          }

          if (!resData) {
            return done(null, {
              status: "error",
              msg: "Account can't be found"
            });
          }

          const { resetExpiryDate } = resData.acctInfo.resetPass;

          if (resetExpiryDate < Date.now()) {
            return done(null, { status: "error", msg: "The link is expired" });
          }

          resData.acctInfo.resetPass.resetToken = "";
          resData.acctInfo.resetPass.resetExpiryDate = Date.now();
          resData.acctInfo.password = pass;

          resData.save(err => {
            if (err) {
              return done(null, {
                status: "error",
                msg: "Something went wrong"
              });
            }

            return done(null, {
              status: "success",
              msg: "You've change your password successfully."
            });
          });
        });
    }
  )
);
