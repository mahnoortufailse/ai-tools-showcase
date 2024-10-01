const express = require("express");
const router = express.Router();
const multer = require("multer");
const { removeBG } = require("../controller/BG_Removal.js"); // Make sure to destructure the removeBG function correctly

const upload = multer();

// Define the route
router.post("/", upload.single("image"), removeBG);

module.exports = router;
