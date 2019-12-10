const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/User");
const Mailer = require("../utility/Mailer");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");

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
        if (!email || !password || password !== req.body.rePassword) {
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
                msg: "There's a error on creating your account"
              });
            }

            crypto.randomBytes(128, (randErro, randBuff) => {
              if (randErro) {
                return cb(null, {
                  status: "error",
                  msg: "There's a error on creating your account"
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
                <a href="${req.protocol}://${
                  req.hostname
                }/auth/uact/${randBuff.toString("hex")}">${req.protocol}://${
                  req.hostname
                }/auth/uact/${randBuff.toString("hex")}</a>`
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
                        msg: "There's a error on creating your account"
                      });
                    }

                    return cb(false, {
                      status: "success",
                      data: { email }
                    });
                  });
                })
                .catch(reas => {
                  newUser.remove();
                  return cb(null, {
                    status: "error",
                    msg: "There's a error on creating your account"
                  });
                });
            });
          });
        });
      } catch (error) {
        return cb(null, {
          status: "error",
          msg: "There's a error on creating your account"
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

          if (!resData) {
            return done(null, {
              status: "error",
              msg: "Account can't be found."
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

              const { isActivated } = resData.acctInfo.activationInfo;

              if (!isActivated) {
                return done(null, {
                  status: "error",
                  msg: "Account isn't verified"
                });
              }

              const { _id } = resData;

              const {
                firstName,
                lastName,
                email,
                creationType,
                role
              } = resData.acctInfo;

              JWT.sign(
                { creationId: _id, email, type: creationType },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
                (err, encoded) => {
                  if (err) {
                    return done(null, {
                      status: "error",
                      msg: "Something went wrong"
                    });
                  }

                  return done(null, {
                    status: "success",
                    data: {
                      token: encoded,
                      user: { _id, email, firstName, lastName, role }
                    }
                  });
                }
              );
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
              msg: "Something went fetching your data."
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
                msg: "Something went wrong (RG01)."
              });
            }
            Mailer.sender({
              from: `Skótos Reset Password <${process.env.G_USER}>`,
              to: email,
              subject: "Account Reset Password",
              html: `You've successfully requested for your password to be reset. 
              Here's a link for you to be able to reset your password. 
              Bare in mind that after <strong><i>2 hours</i></strong> this link will expired. <br /> 
              <a href="${req.protocol}://${
                req.hostname
              }/auth/ures/${randBuff.toString("hex")}">Click me </a>`
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
                      msg: "Something went requesting for reset password."
                    });
                  }

                  return done(null, { status: "success", data: { email } });
                });
              })
              .catch(err => {
                done(null, {
                  status: "error",
                  msg: "Something went sending an email."
                });
              });
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

passport.use(
  "Local.google_signin",
  new LocalStrat(
    {
      usernameField: "email",
      passwordField: "name",
      passReqToCallback: true
    },
    (req, email, name, done) => {
      const { familyName, givenName, googleId } = req.body;
      if ((!familyName, !givenName, !googleId, !email, !name)) {
        return done(null, {
          status: "error",
          msg: "Please fill all parameters."
        });
      }

      User.findOne({ "acctInfo.creationId": googleId }, (errData, resData) => {
        if (errData) {
          return done(null, {
            status: "error",
            msg: "Something went wrong"
          });
        }

        if (resData) {
          const { _id } = resData;

          const {
            email,
            firstName,
            lastName,
            creationType,
            role
          } = resData.acctInfo;
          JWT.sign(
            { creationId: _id, email, type: creationType },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, encoded) => {
              return done(null, {
                status: "success",
                msg: {
                  token: encoded,
                  user: { _id, email, firstName, lastName, role }
                }
              });
            }
          );
        }

        if (!resData) {
          let newUser = new User({
            acctInfo: {
              firstName: givenName,
              lastName: familyName,
              email,
              activationInfo: { isActivated: true },
              creationType: "Google",
              creationId: googleId
            }
          });

          newUser.save(err => {
            if (err) {
              return done(null, {
                status: "error",
                msg: "Something went wrong."
              });
            }

            const { _id } = newUser;

            const {
              email,
              firstName,
              lastName,
              creationType,
              role
            } = newUser.acctInfo;
            JWT.sign(
              { creationId: _id, email, type: creationType },
              process.env.JWT_SECRET,
              { expiresIn: "1d" },
              (err, encoded) => {
                return done(null, {
                  status: "success",
                  msg: {
                    token: encoded,
                    user: { _id, email, firstName, lastName, role }
                  }
                });
              }
            );
          });
        }
      });
    }
  )
);
