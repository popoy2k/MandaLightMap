const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/User");
const Mailer = require("../utility/Mailer");
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
              console.log("this shit => ", isMatch);
              if (isMatch instanceof Error) {
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
