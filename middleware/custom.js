const User = require("../model/User");
const Activator = require("../utility/Activator");
const JWT = require("jsonwebtoken");

const customActivate = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).json({ status: "error", msg: "Something went wrong." });
    return next();
  }

  User.findOne({
    "acctInfo.creationType": "Local",
    "acctInfo.activationInfo.activationToken": token
  })
    .select("-acctInfo.password")
    .exec((err, responseData) => {
      if (err) {
        res.status(400).json({ status: "error", msg: "Something went wrong." });
        return next();
      }

      if (!responseData) {
        res.status(400).json({ status: "error", msg: "Invalid Credentials." });
        return next();
      }
      const { activationExpiry } = responseData.acctInfo.activationInfo;
      const { email, firstName } = responseData.acctInfo;

      if (new Date(activationExpiry) < new Date()) {
        res.status(400).json({
          status: "error",
          msg: "The link is expired, try to re-signup"
        });
        return next();
      }

      Activator.sender(responseData._id)
        .then(returnData => {
          res
            .status(200)
            .json({ status: "success", data: { email, firstName } });
          return next();
        })
        .catch(returnError => {
          res.status(400).json({
            status: "error",
            msg: "The link is expired, try to re-signup"
          });
          return next();
        });
    });
};

const verifyToken = (req, res, next) => {
  const bearer = req.headers["x-auth-token"] || null;

  if (bearer === null) {
    res.status(400);
    return next("router");
  }

  const token = bearer.split(" ").slice(-1)[0];

  if (!token || token.indexOf("bearer") > -1) {
    res.status(400);
    return next("router");
  }

  JWT.verify(token, process.env.JWT_SECRET, (jwtErr, decoded) => {
    if (jwtErr) {
      res.status(400);
      return next("router");
    }

    const { creationId: initId, email: initEmail, type: initType } = decoded;
    User.findOne({ "acctInfo.creationId": initId }, (fetchErr, resData) => {
      if (fetchErr) {
        res.status(400);
        return next("router");
      }

      const {
        email,
        creationType,
        creationId,
        firstName,
        lastName
      } = resData.acctInfo;
      if (initEmail !== email || creationType !== initType) {
        res.status(400);
        return next("router");
      }

      JWT.sign(
        { creationId, email, type: creationType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (signErr, encoded) => {
          if (signErr) {
            res.status(400);
            return next("router");
          }

          res
            .status(200)
            .json({ token: encoded, user: { email, firstName, lastName } });
          return next();
        }
      );
    });
  });
};

module.exports = { customActivate, verifyToken };
