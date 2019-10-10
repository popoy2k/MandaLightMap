const router = require("express").Router();
const MandaLipo = require("../model/MandaLipo");

router.route("/landing").get((req, res) => {
  MandaLipo.find({ year: "2019", month: "01" }).exec((err, resData) => {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", msg: "Something went wrong" });
    }

    let finalData = resData[0]["lipoData"].map(val => {
      const { max, mean, min, mapId } = val;
      return { mean, max, min, mapId };
    });

    res.status(200).json({ status: "success", data: finalData });
  });
});

module.exports = router;
