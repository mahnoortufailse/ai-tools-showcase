const { generateImage, getImages } = require("../controller/imageGenerationController.js");
const express = require("express");
const router = express.Router();

router.post("/generate-image", generateImage);
router.get("/images", getImages);

module.exports = router;
