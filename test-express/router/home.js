const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Test render pug page", message: "Hello" });
});

module.exports = router;
