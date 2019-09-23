const router = require("express").Router();

router.route("/signup").post((req, res) => {
  console.log(req.body);
});

module.exports = router;
