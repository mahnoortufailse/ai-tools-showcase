const { RegisterUser, LoginUser } = require("../controller/user_controller.js");
const express = require("express");

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);

module.exports = router;
