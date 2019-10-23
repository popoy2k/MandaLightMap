const router = require("express").Router();
const topo = require("topojson-client");
const fs = require("fs");
const path = require("path");

router.route("/main").get((req, res) => {
  fs.readFile(path.join(__dirname, "MandaTopo.json"), (err, resData) => {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", msg: "Something went wrong" });
    }

    let initMap = JSON.parse(resData);
    let cleanMap = topo.feature(initMap, initMap.objects.Mandaluyong).features;

    res.status(200).json({ status: "success", data: cleanMap });
  });
});

module.exports = router;
