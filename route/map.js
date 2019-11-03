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
    /*
      0.002508 & 0.001125 
      Workaround to polygons to be aligned
    */
    let finalMap = cleanMap.map(mVal => ({
      ...mVal,
      geometry: {
        ...mVal.geometry,
        coordinates: mVal.geometry.coordinates.map(m2Val =>
          m2Val.map(m3Val => [m3Val[0] + 0.002908, m3Val[1] - 0.0010525])
        )
      }
    }));

    res.status(200).json({ status: "success", data: finalMap });
  });
});

module.exports = router;
