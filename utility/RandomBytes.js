const crypto = require("crypto");

module.exports = genRand = () => {
  crypto.randomBytes(128, (error, randBuffer) => {
    if (error) {
      return error;
    }
    return randBuffer;
  });
};
