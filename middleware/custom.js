const User = require("../model/User");
const Activator = require("../utility/Activator");
const customActivate = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).json({ status: "error", msg: "Something went wrong." });
    next();
  }

  User.findOne({
    "acctInfo.creationType": "Local",
    "acctInfo.activationInfo.activationToken": token
  })
    .select("-acctInfo.password")
    .exec((err, responseData) => {
      if (err) {
        res.status(400).json({ status: "error", msg: "Something went wrong." });
        next();
      }

      if (!responseData) {
        res.status(400).json({ status: "error", msg: "Invalid Credentials." });
        next();
      }
      const { activationExpiry } = responseData.acctInfo.activationInfo;
      const { email, firstName } = responseData.acctInfo;

      if (new Date(activationExpiry) < new Date()) {
        res.status(400).json({
          status: "error",
          msg: "The link is expired, try to re-signup"
        });
        next();
      }

      Activator.sender(responseData._id)
        .then(returnData => {
          res
            .status(200)
            .json({ status: "success", data: { email, firstName } });
          next();
        })
        .catch(returnError => {
          res.status(400).json({
            status: "error",
            msg: "The link is expired, try to re-signup"
          });
          next();
        });
    });
};

module.exports = customActivate;
