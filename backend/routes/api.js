const router = require("express").Router();

router.get("/", (req, res) => res.send("Welcome at RTEA API Server!"));

module.exports = router;
