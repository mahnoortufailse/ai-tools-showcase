const express = require("express");
const router = express.Router();
const { videoGenerator } = require("../controller/VideoGeneratorController.js");

router.post("/", videoGenerator);

module.exports = router;
