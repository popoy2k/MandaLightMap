const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/User");
const Mailer = require("../utility/Mailer");
const Activator = require("../utility/Activator");
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
            console.log(err);
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
              console.log(err);
              return cb(null, {
                status: "error",
                msg: "Something went wrong."
              });
            }

            crypto.randomBytes(128, (randErro, randBuff) => {
              if (randErro) {
                console.log(randErro);
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
                      return cb(null, {
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
                  console.log("This shit", reas);
                  return cb(null, {
                    status: "error",
                    msg: "Something went wrong."
                  });
                });
            });
          });
        });
      } catch (error) {
        console.log(error);
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
      console.log(req.body, email, password);
      if (!email || !password) {
        return done(true, { status: "error", msg: "Please fill all fields." });
      }

      User.findOne(
        { "acctInfo.email": email, "acctInfo.creationType": "Local" },
        (err, resData) => {
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
              const {
                firstName,
                lastName,
                email,
                creationType,
                creationId
              } = resData.acctInfo;
              done(false, {
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
            .catch(error => {
              return done(true, error);
            });
        }
      );
    }
  )
);

passport.use(
  "Local.activated",
  new LocalStrat(
    {
      usernameField: "token",
      passwordField: "token",
      passReqToCallback: true
    },
    (req, token1, token2, cb) => {
      const { token } = req.body;
      console.log(token, token1, token2);
      if (!token) {
        return cb(null, { status: "error", msg: "Something went wrong." });
      }

      User.findOne({
        "acctInfo.creationType": "Local",
        "acctInfo.activationInfo.activationToken": token
      })
        .select("-acctInfo.password")
        .then(resData => {
          const { email, firstName } = resData.acctInfo;
          const { activationExpiry } = resData.acctInfo.activationInfo;

          if (activationExpiry < Date.now()) {
            return cb(null, { status: "error", msg: "Something went wrong." });
          }

          Activator.sender(resData)
            .then(dataUlit => {
              return cb(true, {
                status: "success",
                data: { email, firstName }
              });
            })
            .catch(errorUlit => {
              return cb(null, {
                status: "error",
                msg: "Something went wrong;"
              });
            });
        })
        .catch(error => {
          return cb(null, { status: "error", msg: "Something went wrong." });
        });
    }
  )
);

passport.use(
  "Local.activate",
  new LocalStrat(
    {
      usernameField: "token",
      passwordField: "token",
      passReqToCallback: true
    },
    (req, user, password, done) => {
      const { token } = req.body;

      User.findOne({
        "acctInfo.creationType": "Local",
        "acctInfo.activationInfo.activationToken": token
      })
        .select("-acctInfo.password")
        .exec((err, retData) => {
          if (err) {
            return done(null, { status: "error", msg: "Something went wrong" });
          }

          if (!retData) {
            return done(null, {
              status: "error",
              msg: "Something went wrong."
            });
          }
          const { activationExpiry } = retData.acctInfo.activationInfo;

          if (activationExpiry < Date.now()) {
            return done(null, {
              status: "error",
              msg: "Your link has expired."
            });
          }

          Activator.sender(retData._id)
            .then(res => console.log(res))
            .catch();

          const { email, firstName } = retData.acctInfo;

          done(true, {
            status: "success",
            data: { firstName, email }
          });
        });
    }
  )
);
