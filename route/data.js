const router = require("express").Router();
const passport = require("passport");
const MandaLipo = require("../model/MandaLipo");
const {
  verifyRequest,
  lipoTable,
  lipoSingle,
  lipoRequest,
  downloadFile,
  handleFile,
  userTable,
  userDetails,
  downloadTable,
  userRoleChange
} = require("../middleware/custom");

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

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

router.route("/custom").post(
  (req, res, next) => {
    passport.authenticate(
      "Local.custom_map_data",

      { session: false },
      (err, msg, info) => {
        if (msg.status === "error") {
          res.status(400).json(msg);
          return next(err);
        }

        res.status(200).json(msg);
        next();
      }
    )(req, res, next);
  },
  (req, res) => {}
);

router.route("/lipo/table").post(verifyRequest, lipoTable, (req, res) => {
  // to be handled
});

router.route("/lipo/single").post(verifyRequest, lipoSingle, (req, res) => {
  // to be handled
});

router.route("/lipo/download").post(verifyRequest, lipoRequest, (req, res) => {
  // to be handled
});

router.route("/lipo/download/:slug").get(downloadFile, (req, res) => {
  // to be handled
});

router
  .route("/lipo/upload")
  .post(verifyRequest, upload.single("file"), handleFile, (req, res) => {
    // to be handled
  });

router.route("/user/table").post(verifyRequest, userTable, (req, res) => {
  // to be handled
});

router.route("/user/detail").post(verifyRequest, userDetails, (req, res) => {
  // to be handled
});

router
  .route("/download/table")
  .post(verifyRequest, downloadTable, (req, res) => {
    // to be handled
  });

router.route("/user/role").post(verifyRequest, userRoleChange, (req, res) => {
  // to be handled
});

module.exports = router;
