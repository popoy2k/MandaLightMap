const fs = require("fs");
const arr = require("d3-array");
const crypto = require("crypto");
const path = require("path");

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

module.exports.isValidUploadJSON = async function(json, callback) {
  try {
    // Check if it has proper element name
    const stLayer = json.map(mVal => Object.keys(mVal));
    const st1Layer = [
      [
        ...new Set(
          arr.merge(
            arr.merge(
              json.map(mVal => mVal.data.map(m2Val => Object.keys(m2Val)))
            )
          )
        )
      ]
    ];

    //  Check if every element container "year" "data" object keys
    stLayer.forEach(feVal => {
      if (!feVal.includes("year") || !feVal.includes("data")) {
        callback("Invalid format.", false);
        return;
      }
    });

    // Check if every year contains "month" "lipoData" object keys
    st1Layer.forEach(feVal => {
      if (!feVal.includes("month") || !feVal.includes("lipoData")) {
        callback("Invalid format.", false);
        return;
      }
    });

    // Checks if every lipoData object contains "id" "mean" "max" "min" object keys.
    json.forEach(feVal =>
      feVal.data.forEach(fe2Val =>
        fe2Val.lipoData.forEach(fe3Val => {
          let keys = Object.keys(fe3Val);
          if (
            !keys.includes("id") ||
            !keys.includes("mean") ||
            !keys.includes("min") ||
            !keys.includes("max")
          ) {
            callback("Invalid format.", false);
            return;
          }
        })
      )
    );

    // Check if month is < 12 & > 0
    const ndLayer = json.map(mVal => mVal.data.map(m2Val => m2Val.month));
    ndLayer.forEach(feVal =>
      feVal.forEach(fe2Val => {
        let month = parseInt(fe2Val);
        if (month > 12 || month < 1) {
          callback("Invalid month range (1-12) only.", false);
          return;
        }
      })
    );

    // Check if each lipoData has 27 unique id
    // And if containing Inconsistent ID or Zero value
    json.forEach(feVal =>
      feVal.data.forEach(fe2Val => {
        const idNum = [...new Set(fe2Val.lipoData.map(mVal => mVal.id))];
        if (idNum > 27 || idNum < 27) {
          callback("Invalid data parameters. Inconsistent in Id value.", false);
          return;
        }

        fe2Val.lipoData.forEach(fe3Val => {
          let { mean, max, min } = fe3Val;
          if (
            parseFloat(mean) < 1 ||
            parseFloat(min) < 1 ||
            parseFloat(max) < 1
          ) {
            callback("Invalid parameters. Zero value detected.", false);
            return;
          }
        });
      })
    );

    const finalData = json.map(mVal => ({
      year: mVal.year,
      data: mVal.data.map(m2Val => ({
        month: m2Val.month,
        lipoData: m2Val.lipoData.map(m3Val => ({
          mean: m3Val.mean,
          max: m3Val.max,
          min: m3Val.min,
          id: m3Val.id
        }))
      }))
    }));

    callback(null, finalData);
  } catch (error) {
    callback("Something went wrong while parsing the file.", false);
  }
};

module.exports.saveUpload = async function(file, callback) {
  const rand = await crypto.randomBytes(16).toString("hex");
  fs.writeFile(
    path.join(path.dirname(__dirname), `storage/upload/${rand}.json`),
    JSON.stringify(file, null, 2),
    err => {
      if (err) {
        callback(err, false);
        return;
      }

      callback(null, `${rand}.json`);
    }
  );
};
