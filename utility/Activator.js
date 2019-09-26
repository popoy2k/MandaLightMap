const User = require("../model/User");

module.exports.sender = userId =>
  User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "acctInfo.activationInfo.isActivated": true,
        "acctInfo.activationInfo.activationToken": "",
        "acctInfo.activationInfo.activationExpiry": Date.now()
      }
    },
    {
      new: true,
      fields: { "acctInfo.email": 1, "acctInfo.firstName": 1 }
    }
  );
