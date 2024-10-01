const express = require("express");
const router = express.Router();
const { generateIcon } = require("../controller/IconGenerateController.js");

router.post("/", generateIcon);

module.exports = router;
