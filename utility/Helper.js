const fs = require("fs");

/*
    @Desc - Helper function that defines if path is valid
            and if not automatically create it.
*/
module.exports.isDir = async function(dirPath, callback) {
  const isValid = await fs.existsSync(dirPath);
  if (!isValid) {
    fs.mkdir(dirPath, err => {
      if (typeof callback === "function") {
        callback(err ? err : true);
      }
    });
  }
  if (typeof callback === "function") {
    callback(isValid);
  }
};
