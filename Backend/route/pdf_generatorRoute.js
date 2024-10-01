const express = require("express");
const router = express.Router();
const { generatepdf } = require("../controller/pdf-generatorController");
router.post("/", generatepdf);
module.exports = router;
